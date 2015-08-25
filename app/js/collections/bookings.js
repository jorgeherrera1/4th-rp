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
    }

  });
})();
