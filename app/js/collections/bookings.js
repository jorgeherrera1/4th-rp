var App = App || {};

(function() {
  'use strict';

  App.Bookings = Backbone.Collection.extend({

    model: App.Booking,

    comparator: function(booking) {
      return booking.get('weekEnding').getTime();
    },

    totalHoursBooked: function() {
      var sumFn = function(total, hours) {
        return total + hours;
      };

      return this.pluck('hours').reduce(sumFn, 0);
    }

  });
})();
