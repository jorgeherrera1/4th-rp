var App = App || {};

(function() {
  'use strict';

  App.ResourceBookingsView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-bookings-template').html()),

    events: {
      'change input.resource-name': 'nameWasChanged',
      'change input.resource-role': 'roleWasChanged',
    },

    render: function() {
      this.$el.html(this.template({
        name: this.model.get('name'),
        role: this.model.get('role'),
        bookingsByWeekEnding: this.model.get('bookings').totalHoursByWeekEnding(),
        totalHours: this.model.get('bookings').totalHours()
      }));

      return this;
    },

    nameWasChanged: function(evt) {
      this.model.set('name', evt.currentTarget.value);
    },

    roleWasChanged: function(evt) {
      this.model.set('role', evt.currentTarget.value);
    }

  });
})();
