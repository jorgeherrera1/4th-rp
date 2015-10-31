var App = App || {};

(function() {
  'use strict';

  App.ResourceBookingsView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-bookings-template').html()),

    // events: {
      //'change input.resource-name': 'nameWasChanged'
    //},

    render: function() {
      this.$el.html(this.template({
        name: this.model.get('name'),
        role: this.model.get('role'),
        bookingsByWeekEnding: this.model.get('bookings').totalHoursByWeekEnding(),
        totalHours: this.model.get('bookings').totalHours()
      }));

      return this;
    }

  });
})();
