var ResourcePlan = ResourcePlan || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	var today = new Date();
	var numberOfWeeks = 4;
	var resources = new ResourcePlan.Resources([
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.newFromDate(today, numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.newFromDate(today, numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.newFromDate(today, numberOfWeeks)}),
		new ResourcePlan.Resource({bookings:ResourcePlan.Bookings.newFromDate(today, numberOfWeeks)})
	]);

	new ResourcePlan.BookingsWorksheetView({
		collection: resources
	});

});
