var App = App || {};

(function() {
  'use strict';

  App.BookingsWorksheetView = Backbone.View.extend({

    el: '#bookings-worksheet',

    initialize: function() {
      this.$weekEndings = this.$('table thead');
      this.$worksheet = this.$('table tbody');
      this.$totals = this.$('table tfoot');

      this.render();
    },

    render: function() {
      this.renderResourceBookings();

      return this;
    },

    renderResourceBookings: function() {
      var that = this;
      this.collection.each(function(resource) {
        var resourceBookingsView = new App.ResourceBookingsView({
          model: resource
        });

        that.$worksheet.append(resourceBookingsView.render().el);
      });
    }

  });
})();
