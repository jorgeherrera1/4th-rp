var App = App || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	var today = new Date();
	var numberOfWeeks = 4;
	var resources = new App.Resources([
		new App.Resource({bookings:App.Bookings.newFromDate(today, numberOfWeeks)}),
		new App.Resource({bookings:App.Bookings.newFromDate(today, numberOfWeeks)}),
		new App.Resource({bookings:App.Bookings.newFromDate(today, numberOfWeeks)}),
		new App.Resource({bookings:App.Bookings.newFromDate(today, numberOfWeeks)})
	]);

	new App.BookingsWorksheetView({
		collection: resources
	});

});
