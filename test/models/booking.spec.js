describe('Booking Model', function() {

  var booking;

  beforeEach(function() {
    booking = new App.Booking();
  });

  it('should have zero hours by default', function() {
    expect(booking.get('hours')).toBe(0);
  });

  it('should be invalid if week ending is not a date', function() {
    booking.set({weekEnding: '10/12/2015'}, {validate:true});

    expect(booking.validationError).not.toBeNull();
    expect(booking.validationError).toBe('Week ending must be a date');
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

  it('should have all hours in the same month', function() {
    booking.set({
      weekEnding: new Date(2015, 8, 26),
      hours: 40
    });

    var hoursPerMonth = booking.hoursPerMonth();
    console.log(hoursPerMonth);
  });

});
