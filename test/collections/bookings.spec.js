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

  it('should calculate total hours as zero when no bookings', function() {
    var totalHours = bookings.totalHours();

    expect(totalHours).toBe(0);
  })

  it('should calculate total hours by month', function() {
    bookings.add([
      {date: new Date('3/1/2015'), hours: 8},
      {date: new Date('3/10/2015'), hours: 4},
      {date: new Date('4/15/2015'), hours: 0},
      {date: new Date('5/20/2015'), hours: 16},
      {date: new Date('5/25/2015'), hours: 2},
    ]);
    var totalHoursByMonth = bookings.totalHoursByMonth();

    expect(totalHoursByMonth.length).toBe(3);
    expect(totalHoursByMonth[0]).toEqual({month: 'March', hours: 12});
    expect(totalHoursByMonth[1]).toEqual({month: 'April', hours: 0});
    expect(totalHoursByMonth[2]).toEqual({month: 'May', hours: 18});
  });

});
