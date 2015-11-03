var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.Resources = Backbone.Collection.extend({

    model: ResourcePlan.Resource

  });
})();
