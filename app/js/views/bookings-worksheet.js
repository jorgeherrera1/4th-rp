var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.BookingsWorksheetView = Backbone.View.extend({

    el: '#bookings-worksheet',

    events: {
      'click #add-resource': 'addResourceButtonClicked',
      'click #add-week': 'addWeekButtonClicked'
    },

    initialize: function() {
      this.weekEndingsTemplate = _.template($('#worksheet-week-endings-template').html());

      this.$weekEndings = this.$('table thead');
      this.$worksheet = this.$('table tbody');
      this.$totals = this.$('table tfoot');

      this.listenTo(this.collection, 'add', this.addResourceToView);

      this.render();
    },

    render: function() {
      this.renderWeekEndings();
      this.renderResourceBookings();

      return this;
    },

    renderWeekEndings: function() {
      this.$weekEndings.html(this.weekEndingsTemplate({
        weekEndings: ResourcePlan.weekEndings()
      }));
    },

    renderResourceBookings: function() {
      var that = this;
      this.collection.each(function(resource) {
        that.addResourceToView(resource);
      });
    },

    addResourceToView: function(resource) {
      var resourceBookingsView = new ResourcePlan.ResourceBookingsView({
        model: resource
      });

      this.$worksheet.append(resourceBookingsView.render().el);
    },

    addResourceButtonClicked: function() {
      this.collection.add({
        bookings: ResourcePlan.Bookings.fromWeek(ResourcePlan.firstWeek, ResourcePlan.numberOfWeeks)
      });
    },

    addWeekButtonClicked: function() {
      ResourcePlan.numberOfWeeks++;

      this.collection.invoke('extendBookings');
      this.renderWeekEndings();
    }

  });
})();
