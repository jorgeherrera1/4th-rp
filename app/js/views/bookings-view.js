var App = App || {};

(function() {
  'use strict';

  App.BookingsView = Backbone.View.extend({

    el: '#bookings',

    initialize: function(options) {
      this.project = options.project;
      this.weekEndingsTemplate = _.template($('#week-endings-template').html());
      this.bookingTotalsTemplate = _.template($('#booking-totals-template').html());

      this.$thead = this.$('table thead');
      this.$tbody = this.$('table tbody');
      this.$tfoot = this.$('table tfoot');

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
      this.renderBookingTotals();
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

    renderBookingTotals: function() {
      var grandTotal = 0;
      var allBookings = this.collection.pluck('bookings');
      var bookingTotals = _.reduce(allBookings, calculateBookingTotals, []);

      this.$tfoot.html(this.bookingTotalsTemplate({
        bookingTotals: bookingTotals,
        grandTotal: grandTotal
      }))

      function calculateBookingTotals(totals, bookings) {
        _.each(bookings, function(booking, weekNumber) {
          if (!totals[weekNumber]) {
            totals[weekNumber] = 0;
          }

          totals[weekNumber] += booking;
          grandTotal += booking;
        })

        return totals;
      }
    },

    addResourceButtonClicked: function() {
      this.collection.addResource();
    },

    addWeekButtonClicked: function() {
      this.collection.each(function(resource) {
        resource.extendBookings(1);
      });

      this.renderWeekEndings();
      this.renderBookingTotals();
    },

    addResourceToView: function(resource) {
      var view = new App.ResourceView({
        model: resource
      });
      view.on('bookingChanged', this.renderBookingTotals, this);

      this.$tbody.append(view.render().el);
    }

  });
})();
