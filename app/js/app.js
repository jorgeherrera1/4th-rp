var App = App || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	var bookings = new App.Bookings();

  new App.BookingsView({
		collection: bookings
	});

	bookings.add([
		{
			name: 'Jorge',
			bookings: [40, 40, 40, 20]
		},
		{
			name: 'Luis',
			bookings: [20, 20, 20, 10]
		}
	]);
});
