var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.Resource = Backbone.Model.extend({

    defaults: {
      name: 'Resource',
      role: 'Developer'
    }

  });
})();
