var App = App || {};

(function() {
  'use strict';

  App.Booking = Backbone.Model.extend({

    defaults: {
      weekEnding: undefined,
      hours: 0
    }

  });
})();
