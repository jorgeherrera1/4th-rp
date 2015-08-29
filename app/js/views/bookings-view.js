var App = App || {};

(function() {
  'use strict';

  App.BookingsView = Backbone.View.extend({

    el: '#bookings',

    initialize: function(options) {
      this.project = options.project;
      this.weekEndingsTemplate = _.template($('#week-endings-template').html());

      this.$thead = this.$('table thead');
      this.$tbody = this.$('table tbody');

      this.listenTo(this.project, 'change:startDate', this.renderWeekEndings);
      this.listenTo(this.collection, 'add', this.addResourceToView);

      this.render();
    },

    events: {
      'click #add-resource': 'addResourceButtonClicked',
      'click #add-week': 'addWeekButtonClicked'
    },

    render: function() {
      this.renderWeekEndings();
      this.renderResources();
    },

    renderWeekEndings: function() {
      var numberOfWeeks = this.collection.numberOfWeeks();
      var weekEndings = this.project.calculateWeekEndings(numberOfWeeks);

      this.$thead.html(this.weekEndingsTemplate({
        weekEndings: weekEndings
      }));
    },

    renderResources: function() {
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

      this.renderWeekEndings();
    },

    addResourceToView: function(resource) {
      var view = new App.ResourceView({
        model: resource
      })

      this.$tbody.append(view.render().el);
    }

  });
})();
