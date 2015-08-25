var App = App || {};

(function() {
  'use strict';

  App.ProjectView = Backbone.View.extend({

    el: '#project',

    events: {
      'change #project-start-date': 'startDateChanged'
    },

    startDateChanged: function(evt) {
      var startDate = new Date(evt.currentTarget.value);
      this.model.set('startDate', startDate);
    }

  });
})();
