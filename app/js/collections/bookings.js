var App = App || {};

(function() {
  'use strict';

  function totalHoursBy(interval, bookings) {
    var byInterval = function(booking) {
      var b = {};
      b[interval] = booking[interval].apply(booking);
      b.hours = booking.get('hours');

      return b;
    };

    var groupByIntervalAndSumHours = function(totalHoursByInterval, intervalHours) {
      var hoursByInterval = _.find(totalHoursByInterval, function(item) {
        return item[interval] === intervalHours[interval];
      });

      if (hoursByInterval) {
        hoursByInterval.hours += intervalHours.hours;
      } else {
        totalHoursByInterval.push(intervalHours);
      }

      return totalHoursByInterval;
    };

    return bookings.chain()
                   .map(byInterval)
                   .reduce(groupByIntervalAndSumHours, [])
                   .value();
  }

  App.Bookings = Backbone.Collection.extend({

    model: App.Booking,

    comparator: function(booking) {
      return booking.get('date').getTime();
    },

    weekEndings: function() {
      var weekEndings = this.map(function(booking) {
        return booking.weekEnding();
      });

      return _.uniq(weekEndings);
    },

    totalHours: function() {
      return this.reduce(function(hours, booking) {
        return hours + booking.get('hours');
      }, 0);
    },

    totalHoursByWeekEnding: function() {
      return totalHoursBy('weekEnding', this);
    },

    totalHoursByMonth: function() {
      return totalHoursBy('month', this);
    },

    addWeek: function() {
      this.addWeeks(1);
    },

    addWeeks: function(numberOfWeeks) {
      var lastBookingDate = this.last().get('date');
      var nextWeek = moment(lastBookingDate).add(1, 'week');

      this.add(App.Bookings.newFromDate(nextWeek, numberOfWeeks));
    }

  }, {
    newFromDate: function(date, numberOfWeeks) {
      var bookings = [];
      var startDate = moment(date).day('Monday');
      var endDate = moment(startDate).add(numberOfWeeks - 1, 'weeks').day('Friday');

      moment.range(startDate, endDate).by('days', function(day) {
        // ignore sunday and saturday
        if (day.day() === 0 || day.day() === 6) {
          return;
        }

        bookings.push({
          date: day.toDate()
        });
      });

      return bookings;
    }
  });
})();
