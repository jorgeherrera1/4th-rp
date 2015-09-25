var App = App || {};

(function() {
  'use strict';

  App.Booking = Backbone.Model.extend({

    defaults: {
      weekEnding: undefined,
      hours: 0
    },

    validate: function(attrs) {
      if (!_.isUndefined(attrs.weekEnding)) {
        if (!_.isDate(attrs.weekEnding)) {
          return 'Week ending must be a date';
        }
      }

      if (!_.isUndefined(attrs.hours)) {
        if (!_.isNumber(attrs.hours)) {
          return 'Booking must be a number';
        }

        if (attrs.hours < 0) {
          return 'Booking cannot be negative';
        }
      }
    }

  });
})();
