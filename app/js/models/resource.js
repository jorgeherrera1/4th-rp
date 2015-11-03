var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.Resource = Backbone.Model.extend({

    defaults: {
      name: ResourcePlan.defaults.RESOURCE_NAME,
      role: ResourcePlan.defaults.RESOURCE_ROLE
    }

  });
})();
