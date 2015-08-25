var App = App || {};

(function() {
  'use strict';

  App.ResourceView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-template').html()),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }

  });
})();
