var App = App || {};

(function() {
  'use strict';

  App.Resource = Backbone.Model.extend({

    defaults: {
      name: 'Resource',
      role: 'Developer'
    }

  });
})();
