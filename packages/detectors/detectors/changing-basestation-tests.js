var setup = function() {
  Detectors.setDetectors([Detectors.ChangingBasestation])
  Basestations.Basestations.remove({})
  ARFCNs.ARFCNs.remove({})
  Threats.Threats.remove({})
  GSMReadings.GSMReadings.remove({})
}

var requiredFields = [
  {field: "cid", threatScore: 50},
  {field: "mnc", threatScore: 50},
  {field: "mcc", threatScore: 50},
  {field: "lac", threatScore: 30}
]
_.each(requiredFields, function(row) {
  var field = row.field
  var title = 'Detectors - Changing Basestation - Changing the ' + field + " raises an alarm"
  Tinytest.add(title , function (test) {
    setup()

    var reading = {
      arfcnId: "a1",
      scanner: "test",
      frequency: 123,
      timestamp: new Date()
    }
    // Add the required fields to the reading.
    // They will not change during testing.
    var staticFields = _.difference(_.map(requiredFields, function(f) {return f.field}), [field])
    _.each(staticFields, function(staticField) {
      reading[staticField] = 923874
    })
    reading[field] = 243
    GSMReadings.GSMReadings.insert(reading)

    reading[field] = 4349
    GSMReadings.GSMReadings.insert(reading)

    test.equal(Status.threatScore(), row.threatScore)
    test.equal(Threats.Threats.find().count(), 1)
  })
})
