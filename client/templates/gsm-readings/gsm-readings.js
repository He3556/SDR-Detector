Template.gsmReadings.helpers({
  readings: function() {
    return GSMReadings.GSMReadings.find({}, {
      sort: { timestamp: -1 },
      limit: 300
    });
  },
  // count: function() {
  //   return GSMReadings.GSMReadings.find().count()
  // }
});
