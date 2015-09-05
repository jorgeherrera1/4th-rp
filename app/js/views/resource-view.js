var App = App || {};

(function() {
  'use strict';

  App.ResourceView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-template').html()),

    events: {
      'change input.name': 'nameChanged',
      'change input.role': 'roleChanged',
      'change input[data-week-number]': 'bookingChanged'
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    nameChanged: function(evt) {
      this.model.set('name', evt.currentTarget.value);
    },

    roleChanged: function(evt) {
      this.model.set('role', evt.currentTarget.value);
    },

    bookingChanged: function(evt) {
      var $input = $(evt.currentTarget);
      var weekNumber = $input.data('week-number');
      var newBooking = parseInt($input.val());

      this.model.changeBooking(weekNumber, newBooking);
      this.$('.resource-booking-totals').html(this.model.get('totalHoursBooked').toString());
    }

  });
})();
