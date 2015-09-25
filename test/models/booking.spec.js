describe('Booking Model', function() {

  var booking;

  beforeEach(function() {
    booking = new App.Booking();
  });

  it('should have zero hours by default', function() {
    expect(booking.get('hours')).toBe(0);
  });

});
