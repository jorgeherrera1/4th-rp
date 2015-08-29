var App = App || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	// initialize project and bookings
  App.project = new App.Project();
	App.bookings = new App.Bookings([
		{
			name: 'Resource 1',
			bookings: [40, 0, 0, 0]
		},
		{
			name: 'Resource 2',
			bookings: [0, 40, 0, 0]
		}
	]);

  new App.ProjectView({
		model: App.project
	});

	new App.BookingsView({
		project: App.project,
		collection: App.bookings
	});
});
