var App = App || {};

(function() {
  'use strict';

  App.Booking = Backbone.Model.extend({

    defaults: {
      hours: 0
    },

    validate: function(attrs) {
      if (!attrs.date) {
        return 'Booking date is required';
      }
    }

  });
})();
