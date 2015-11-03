var ResourcePlan = ResourcePlan || {};

(function() {
  'use strict';

  ResourcePlan.Booking = Backbone.Model.extend({

    defaults: {
      hours: 0
    },

    validate: function(attrs) {
      if (!attrs.date) {
        return 'Booking date is required';
      }
    },

    month: function() {
      return moment(this.get('date')).format('MMMM');
    },

    weekEnding: function() {
      return moment(this.get('date')).endOf('week').format('MM/DD/YYYY');
    }

  });
})();
