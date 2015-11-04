var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.Resource = Backbone.Model.extend({

    defaults: {
      name: 'Resource',
      role: 'Developer'
    },

    changeBookingForWeek: function(weekEnding, hours) {
      var bookings = this.get('bookings').filter(function(booking) {
        return booking.weekEnding() === weekEnding;
      });

      _.invoke(bookings, 'set', 'hours', hours/5);
      this.trigger('bookingChangedForWeek');
    },

    extendBookings: function() {
      this.get('bookings').addWeek();
      this.trigger('bookingsExtended');
    }

  });
})();
