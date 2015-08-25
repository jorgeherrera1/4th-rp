var App = App || {};

(function() {
  'use strict';

  App.Resource = Backbone.Model.extend({

    defaults: {
      name: '',
      bookings: [0]
    },

    extendBookingsOneWeek: function() {
      var bookings = _.clone(this.get('bookings'));
      bookings.push(0);
      this.set('bookings', bookings);
    }

  });
})();
