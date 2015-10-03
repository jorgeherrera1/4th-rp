describe('Booking Model', function() {

  var booking;

  beforeEach(function() {
    booking = new App.Booking();
  });

  it('should be invalid when no booking date is set', function() {
    expect(booking.isValid()).toBeFalsy();
    expect(booking.validationError).toBe('Booking date is required');
  });

});
