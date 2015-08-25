var App = App || {};

(function() {
  'use strict';

  App.Project = Backbone.Model.extend({

    defaults: {
      name: 'Project',
      startDate: new Date()
    }

  });
})();
