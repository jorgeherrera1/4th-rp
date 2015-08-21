var App = App || {};

(function() {
  'use strict';

  App.Booking = Backbone.Model.extend({
    defaults: {
      resource: '',
      weekEnding: null,
      hours: 0
    }
  });
})();
