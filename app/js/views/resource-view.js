var App = App || {};

(function() {
  'use strict';

  App.ResourceView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'change:bookings', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }

  });
})();
