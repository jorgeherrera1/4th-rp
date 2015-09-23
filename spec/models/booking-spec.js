describe('Booking', function() {

  var Booking = require('../../app/js/models/booking.js');
  var booking;

  beforeEach(function() {
    var booking = new Booking();
  });

  it('should have zero hours by default', function() {
    expect(booking.get('hours')).toEqual(0);
  });

});
