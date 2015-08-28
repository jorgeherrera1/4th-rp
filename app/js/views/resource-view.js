var App = App || {};

(function() {
  'use strict';

  App.ResourceView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#resource-template').html()),

    events: {
      'change input': 'bookingChanged'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:bookings', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    bookingChanged: function(evt) {
      var $input = $(evt.currentTarget);
      var weekNumber = $input.data('week-number');
      var newBooking = parseInt($input.val());

      this.model.changeBooking(weekNumber, newBooking);
    }

  });
})();
