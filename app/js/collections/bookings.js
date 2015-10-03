var App = App || {};

(function() {
  'use strict';

  App.Bookings = Backbone.Collection.extend({

    model: App.Booking,

    comparator: function(booking) {
      return booking.get('date').getTime();
    }

  });
})();
