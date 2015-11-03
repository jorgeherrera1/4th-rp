describe('Booking Model', function() {

  var booking;

  beforeEach(function() {
    booking = new ResourcePlan.Booking();
  });

  it('should be invalid when no booking date is set', function() {
    expect(booking.isValid()).toBeFalsy();
    expect(booking.validationError).toBe('Booking date is required');
  });

  it('should return month of booking', function() {
    booking.set('date', new Date('10/5/2015'));

    expect(booking.month()).toBe('October');
  });

  it('should return week ending of booking', function() {
    booking.set('date', new Date('10/19/2015'));

    expect(booking.weekEnding()).toBe('10/24/2015');
  });

});
