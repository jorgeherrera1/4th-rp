var App = App || {};

(function() {
  'use strict';

  App.BookingsView = Backbone.View.extend({

    el: '#bookings',

    initialize: function() {
      this.$table = this.$('table tbody');
      this.listenTo(this.collection, 'add', this.addResourceToView);
    },

    events: {
      'click #add-resource': 'addResource'
    },

    addResource: function() {
      this.collection.add({
        name: 'Resource',
        bookings: [0, 0, 0, 0]
      });
    },

    addResourceToView: function(resource) {
      var view = new App.ResourceView({
        model: resource
      })

      this.$table.append(view.render().el);
    }

  });
})();
