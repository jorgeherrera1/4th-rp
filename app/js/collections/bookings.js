var App = App || {};

(function() {
  'use strict';

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

    totalHoursByMonth: function() {
      return this.chain()
                 .map(function(booking) {
                   var b = {};
                   b.month = moment(booking.get('date')).format('MMMM')
                   b[b.month] = booking.get('hours');
                   return b;
                 })
                 .reduce(function(hoursByMonth, booking) {
                   var month = booking.month;
                   if (_.has(hoursByMonth, month)) {
                     hoursByMonth[month] += booking[month];
                   } else {
                     hoursByMonth[month] = booking[month];
                   }

                   return hoursByMonth;
                 }, {})
                 .value();
    }

  });
})();
