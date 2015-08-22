var App = App || {};

(function() {
  'use strict';

  App.WorksheetView = Backbone.View.extend({

    el: '#worksheet',

    events: {
      'click #add-resource': 'addResource'
    },

    addResource: function() {
      alert('add resource');
    }

  });
})();
