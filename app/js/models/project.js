var App = App || {};

(function() {
  'use strict';

  App.Project = Backbone.Model.extend({

    defaults: {
      name: 'Project',
      startDate: new Date()
    },

    calculateWeekEndings: function(numberOfWeeks) {
      var weekEndingsRange = _.range(numberOfWeeks);
      var startDate = moment(this.get('startDate'));

      var weekEndings = _.map(weekEndingsRange, function(weekNumber) {
        return startDate.add(weekNumber, 'weeks').endOf('week').format('MM/DD/YYYY');
      });

      return weekEndings;
    }

  });
})();
