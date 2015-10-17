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

  it('should calculate total hours', function() {
    bookings.add([
      {date: new Date(2015, 2, 1), hours: 2},
      {date: new Date(2015, 2, 10), hours: 4},
      {date: new Date(2015, 3, 15), hours: 6},
      {date: new Date(2015, 4, 20), hours: 8},
      {date: new Date(2015, 4, 25), hours: 10},
    ]);
    var totalHours = bookings.totalHours();

    expect(totalHours).toBe(30);
  })

  it('should calculate total hours by month', function() {
    bookings.add([
      {date: new Date(2015, 2, 1), hours: 8},
      {date: new Date(2015, 2, 10), hours: 4},
      {date: new Date(2015, 3, 15), hours: 0},
      {date: new Date(2015, 4, 20), hours: 16},
      {date: new Date(2015, 4, 25), hours: 2},
    ]);
    var totalHoursByMonth = bookings.totalHoursByMonth();

    expect(totalHoursByMonth['March']).toBe(12);
    expect(totalHoursByMonth['April']).toBe(0);
    expect(totalHoursByMonth['May']).toBe(18);
  });

});
