var App = App || {};

(function() {
  'use strict';

  App.Resource = Backbone.Model.extend({

    defaults: {
      name: 'Resource',
      bookings: []
    },

    extendBookings: function(numberOfWeeks) {
      var currentBookings = this.get('bookings');
      var newBookings = new Array(numberOfWeeks);
      while(numberOfWeeks--) newBookings[numberOfWeeks] = 0;

      this.set('bookings', currentBookings.concat(newBookings));
    },

    numberOfWeeksBooked: function() {
      var bookings = this.get('bookings');
      return bookings.length;
    }

  });
})();
