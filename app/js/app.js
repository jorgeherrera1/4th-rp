var ResourcePlan = ResourcePlan || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	ResourcePlan.firstWeek = moment().day('Saturday');
	ResourcePlan.numberOfWeeks = 4;
	ResourcePlan.weekEndings = function() {
		return _.chain(_.range(ResourcePlan.numberOfWeeks))
		        .map(function(weekNumber) {
							return moment(ResourcePlan.firstWeek).add(weekNumber, 'weeks').format('MM/DD/YYYY');
						})
						.value();
	};

  var resources = new ResourcePlan.Resources([
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.fromWeek(ResourcePlan.firstWeek, ResourcePlan.numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.fromWeek(ResourcePlan.firstWeek, ResourcePlan.numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.fromWeek(ResourcePlan.firstWeek, ResourcePlan.numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.fromWeek(ResourcePlan.firstWeek, ResourcePlan.numberOfWeeks)})
	]);

	new ResourcePlan.BookingsWorksheetView({
		collection: resources
	});

});
