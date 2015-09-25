describe('Booking Model', function() {

  var booking;

  beforeEach(function() {
    booking = new App.Booking();
  });

  it('should have zero hours by default', function() {
    expect(booking.get('hours')).toBe(0);
  });

  it('should be invalid if hours are non numeric', function() {
    booking.set({hours: '8h'}, {validate:true});

    expect(booking.validationError).not.toBeNull();
    expect(booking.validationError).toBe('Booking must be a number');
  });

  it('should be invalid if hours are negative', function() {
    booking.set({hours: -1}, {validate:true});

    expect(booking.validationError).not.toBeNull();
    expect(booking.validationError).toBe('Booking cannot be negative');
  });

  it('should be valid if hours are positive', function() {
    booking.set({hours: 8}, {validate:true});

    expect(booking.validationError).toBeNull();
    expect(booking.get('hours')).toBe(8);
  });

});
