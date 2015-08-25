var App = App || {};

(function() {
  'use strict';

  App.BookingsView = Backbone.View.extend({

    el: '#bookings',

    initialize: function() {
      this.$table = this.$('table tbody');
      this.listenTo(this.collection, 'add', this.addResourceToView);

      this.render();
    },

    events: {
      'click #add-resource': 'addResourceButtonClicked',
      'click #add-week': 'addWeekButtonClicked'
    },

    render: function() {
      var that = this;
      this.collection.each(function(resource) {
        that.addResourceToView(resource);
      });
    },

    addResourceButtonClicked: function() {
      this.collection.addResource();
    },

    addWeekButtonClicked: function() {
      this.collection.each(function(resource) {
        resource.extendBookings(1);
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
