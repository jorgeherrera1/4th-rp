describe('Bookings Collection', function() {

  var bookings;

  beforeEach(function() {
    bookings = new App.Bookings([
      { weekEnding: new Date(2015, 9, 12), hours: 40 },
      { weekEnding: new Date(2015, 9, 19), hours: 32 },
      { weekEnding: new Date(2015, 9, 26), hours: 40 }
    ]);
  });

  it('should calculate the total hours booked', function() {
    expect(bookings.totalHoursBooked()).toBe(112);
  });

});
