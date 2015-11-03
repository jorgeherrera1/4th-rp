var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.ResourceBookingsView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-bookings-template').html()),

    events: {
      'change input.resource-name': 'nameWasChanged',
      'change input.resource-role': 'roleWasChanged',
      'change input[data-week-ending]': 'bookingWasChanged'
    },

    initialize: function() {
      this.on('bookingChanged', this.renderTotalHours);
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

    renderTotalHours: function() {
      this.$('.resource-total-hours').html(this.model.get('bookings').totalHours());
    },

    nameWasChanged: function(evt) {
      this.model.set('name', evt.currentTarget.value);
    },

    roleWasChanged: function(evt) {
      this.model.set('role', evt.currentTarget.value);
    },

    bookingWasChanged: function(evt) {
      var $input = $(evt.currentTarget);
      var weekEnding = $input.data('week-ending');
      var hours = parseInt($input.val());

      var bookings = this.model.get('bookings').filter(function(booking) {
        return booking.weekEnding() === weekEnding;
      });

      _.invoke(bookings, 'set', 'hours', hours/5);
      this.trigger('bookingChanged');
    }

  });
})();
