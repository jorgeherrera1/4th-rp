var App = App || {};

(function() {
  'use strict';

  App.Bookings = Backbone.Collection.extend({

    model: App.Resource,

    addResource: function() {
      var resource = new App.Resource();
      var numberOfWeeks = this.numberOfWeeks();
      resource.extendBookings(numberOfWeeks);

      this.add(resource);
    },

    numberOfWeeks: function() {
      return this.at(0).numberOfWeeksBooked();
    },

    calculateTotals: function() {
      // initialize totals
      var numberOfWeeks = this.numberOfWeeks();
      var totals = new Array(numberOfWeeks);
      while(numberOfWeeks--) totals[numberOfWeeks] = 0;
      var grandTotal = 0;

      // get all bookings
      var bookings = this.pluck('bookings');

      // sum bookings by week ending
      for (var x = 0; x < bookings.length; x++) {
        var resourceBookings = bookings[x];

        for (var y = 0; y < resourceBookings.length; y++) {
          totals[y] += resourceBookings[y];
          grandTotal += resourceBookings[y];
        }
      }

      return {
        bookingTotals: totals,
        grandTotal: grandTotal
      };
    }

  });
})();
