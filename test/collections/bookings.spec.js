describe('Bookings Collection', function() {

  var bookings;

  beforeEach(function() {
    bookings = new ResourcePlan.Bookings();
  });

  it('should order the bookings by date', function() {
    bookings.add({date: new Date(2015, 5, 15)});
    bookings.add({date: new Date(2013, 5, 10)});
    bookings.add({date: new Date(2011, 5, 5)});

    expect(bookings.at(0).get('date')).toEqual(new Date(2011, 5, 5));
    expect(bookings.at(1).get('date')).toEqual(new Date(2013, 5, 10));
    expect(bookings.at(2).get('date')).toEqual(new Date(2015, 5, 15));
  });

  it('should return the week endings', function() {
    bookings.add([
      {date: new Date('10/21/2015'), hours: 6},
      {date: new Date('10/7/2015'), hours: 2},
      {date: new Date('10/14/2015'), hours: 4},
      {date: new Date('10/12/2015'), hours: 4},
      {date: new Date('10/8/2015'), hours: 2}
    ]);

    var weekEndings = bookings.weekEndings();

    expect(weekEndings.length).toBe(3);
    expect(weekEndings[0]).toBe('10/10/2015');
    expect(weekEndings[1]).toBe('10/17/2015');
    expect(weekEndings[2]).toBe('10/24/2015');
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

  it('should calculate total hours by week ending', function() {
    bookings.add([
      {date: new Date('9/28/2015'), hours: 8},
      {date: new Date('10/1/2015'), hours: 8},
      {date: new Date('10/3/2015'), hours: 0},
      {date: new Date('10/5/2015'), hours: 10},
      {date: new Date('10/9/2015'), hours: 4},
    ]);
    var totalHoursByWeekEnding = bookings.totalHoursByWeekEnding();

    expect(totalHoursByWeekEnding.length).toBe(2);
    expect(totalHoursByWeekEnding[0]).toEqual({weekEnding: '10/03/2015', hours: 16});
    expect(totalHoursByWeekEnding[1]).toEqual({weekEnding: '10/10/2015', hours: 14});
  });

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

  it('should add one week', function() {
    bookings.add([
      {date: new Date('10/20/2015'), hours: 8},
      {date: new Date('10/21/2015'), hours: 8},
      {date: new Date('10/22/2015'), hours: 10},
      {date: new Date('10/26/2015'), hours: 4}
    ]);

    bookings.addWeek();

    expect(bookings.length).toBe(9);
    expect(bookings.at(4).get('date')).toEqual(new Date('11/2/2015'));
    expect(bookings.at(5).get('date')).toEqual(new Date('11/3/2015'));
    expect(bookings.at(6).get('date')).toEqual(new Date('11/4/2015'));
    expect(bookings.at(7).get('date')).toEqual(new Date('11/5/2015'));
    expect(bookings.at(8).get('date')).toEqual(new Date('11/6/2015'));
  });

  it('should add two weeks', function() {
    bookings.add([
      {date: new Date('10/20/2015'), hours: 8},
      {date: new Date('10/21/2015'), hours: 8},
      {date: new Date('10/22/2015'), hours: 10},
      {date: new Date('10/26/2015'), hours: 4}
    ]);

    bookings.addWeeks(2);

    expect(bookings.length).toBe(14);
    // first week
    expect(bookings.at(4).get('date')).toEqual(new Date('11/2/2015'));
    expect(bookings.at(5).get('date')).toEqual(new Date('11/3/2015'));
    expect(bookings.at(6).get('date')).toEqual(new Date('11/4/2015'));
    expect(bookings.at(7).get('date')).toEqual(new Date('11/5/2015'));
    expect(bookings.at(8).get('date')).toEqual(new Date('11/6/2015'));
    // second week
    expect(bookings.at(9).get('date')).toEqual(new Date('11/9/2015'));
    expect(bookings.at(10).get('date')).toEqual(new Date('11/10/2015'));
    expect(bookings.at(11).get('date')).toEqual(new Date('11/11/2015'));
    expect(bookings.at(12).get('date')).toEqual(new Date('11/12/2015'));
    expect(bookings.at(13).get('date')).toEqual(new Date('11/13/2015'));

  });

  it('should create an array of bookings given date and number of weeks', function() {
    var bookings = ResourcePlan.Bookings.fromWeek('09/29/2015', 2);

    expect(bookings.length).toBe(10);
    // first week
    expect(bookings.at(0).get('date')).toEqual(new Date('9/28/2015'));
    expect(bookings.at(1).get('date')).toEqual(new Date('9/29/2015'));
    expect(bookings.at(2).get('date')).toEqual(new Date('9/30/2015'));
    expect(bookings.at(3).get('date')).toEqual(new Date('10/1/2015'));
    expect(bookings.at(4).get('date')).toEqual(new Date('10/2/2015'));
    // second week
    expect(bookings.at(5).get('date')).toEqual(new Date('10/5/2015'));
    expect(bookings.at(6).get('date')).toEqual(new Date('10/6/2015'));
    expect(bookings.at(7).get('date')).toEqual(new Date('10/7/2015'));
    expect(bookings.at(8).get('date')).toEqual(new Date('10/8/2015'));
    expect(bookings.at(9).get('date')).toEqual(new Date('10/9/2015'));
  });

});
