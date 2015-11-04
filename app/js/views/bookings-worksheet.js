var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.BookingsWorksheetView = Backbone.View.extend({

    el: '#bookings-worksheet',

    initialize: function() {
      this.weekEndingsTemplate = _.template($('#worksheet-week-endings-template').html());

      this.$weekEndings = this.$('table thead');
      this.$worksheet = this.$('table tbody');
      this.$totals = this.$('table tfoot');

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
        var resourceBookingsView = new ResourcePlan.ResourceBookingsView({
          model: resource
        });

        that.$worksheet.append(resourceBookingsView.render().el);
      });
    }

  });
})();
