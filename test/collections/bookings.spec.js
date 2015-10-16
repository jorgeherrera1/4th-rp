describe('Bookings Collection', function() {

  var bookings;

  beforeEach(function() {
    bookings = new App.Bookings();
  });

  it('should order the bookings by date', function() {
    bookings.add({date: new Date(2015, 5, 15)});
    bookings.add({date: new Date(2013, 5, 10)});
    bookings.add({date: new Date(2011, 5, 5)});

    expect(bookings.at(0).get('date')).toEqual(new Date(2011, 5, 5));
    expect(bookings.at(1).get('date')).toEqual(new Date(2013, 5, 10));
    expect(bookings.at(2).get('date')).toEqual(new Date(2015, 5, 15));
  });

  it('should calculate hours by month', function() {
    bookings.add([
      {date: new Date(2015, 2, 1), hours: 8},
      {date: new Date(2015, 2, 10), hours: 4},
      {date: new Date(2015, 3, 15), hours: 0},
      {date: new Date(2015, 4, 20), hours: 16},
      {date: new Date(2015, 4, 25), hours: 2},
    ]);

    console.log(bookings.hoursByMonth());
  });

});
