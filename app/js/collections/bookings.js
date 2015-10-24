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
    }

  });
})();
