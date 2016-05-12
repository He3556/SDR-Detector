// Write your tests here!
// Here is an example.
if(Meteor.isServer){
  Tinytest.add('Status - calculate threat score & level', function (test) {
    // Initially threats
    Threats.Threats.remove({})
    Status.ensureDefault()
    Status.setStartRecordingAt(new Date())
    test.equal(Status.threatScore(), 0);
    test.equal(Status.threatLevel(), "Green");

    // Can filter out old threats
    Threats.Threats.insert({
      timestamp: new Date(),
      score: 20,
      detector: "Test",
      message: "test"
    })
    Threats.Threats.insert({
      timestamp: moment().subtract(1, 'days').toDate(),
      score: 30,
      detector: "Test",
      message: "test"
    })
    Threats.Threats.insert({
      timestamp: new Date(),
      score: 20,
      detector: "Test",
      message: "test"
    })
    test.equal(Status.threatScore(), 40);
    test.equal(Status.threatLevel(), "Yellow");

    // Can change reference date to include more threats
    Status.setStartRecordingAt(moment().subtract(2, 'days').toDate())
    test.equal(Status.threatScore(), 70);
    test.equal(Status.threatLevel(), "Red");
  });
}
