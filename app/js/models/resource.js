var App = App || {};

(function() {
  'use strict';

  App.Resource = Backbone.Model.extend({

    defaults: {
      name: 'Resource',
      role: '',
      bookings: []
    },

    initialize: function() {
      this.on('change:bookings', this.calculateTotalHoursBooked);

      this.calculateTotalHoursBooked();
    },

    calculateTotalHoursBooked: function() {
      var bookings = this.get('bookings');

      var totalHoursBooked = _.reduce(bookings, function(totalHours, hours) {
        return totalHours + hours;
      }, 0);

      this.set('totalHoursBooked', totalHoursBooked);
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
    },

    changeBooking: function(weekNumber, newBooking) {
      var bookings = this.get('bookings');

      if (bookings[weekNumber] !== newBooking) {
        bookings[weekNumber] = newBooking;

        this.trigger('change:bookings');
      }
    }

  });
})();
