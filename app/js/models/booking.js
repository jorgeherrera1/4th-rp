var App = App || {};

(function() {
  'use strict';

  App.Booking = Backbone.Model.extend({

    defaults: {
      weekEnding: undefined,
      hours: 0
    },

    validate: function(attrs) {
      if (!_.isNumber(attrs.hours)) {
        return 'Booking must be a number';
      }

      if (attrs.hours < 0) {
        return 'Booking cannot be negative';
      }
    }

  });
})();
