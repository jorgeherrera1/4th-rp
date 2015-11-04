var ResourcePlan = ResourcePlan || {};

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

  ResourcePlan.Bookings = Backbone.Collection.extend({

    model: ResourcePlan.Booking,

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

      this.add(ResourcePlan.Bookings.fromWeek(nextWeek, numberOfWeeks).models);
    }

  }, {
    fromWeek: function(date, numberOfWeeks) {
      var _date;

      if (_.isString(date)) {
        _date = moment(date, 'MM/DD/YYYY');
      }

      if (_.isDate(date) || moment.isMoment(date)) {
        _date = moment(date);
      }

      var startDate = moment(_date).day('Monday');
      var endDate = moment(startDate).add(numberOfWeeks - 1, 'weeks').day('Friday');

      var bookings = new ResourcePlan.Bookings();
      moment.range(startDate, endDate).by('days', function(day) {
        // ignore sunday and saturday
        if (day.day() === 0 || day.day() === 6) {
          return;
        }

        bookings.add({
          date: day.toDate()
        });
      });

      return bookings;
    }
  });
})();
