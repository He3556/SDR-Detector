var setup = function() {
  Threats.Threats.remove({})
  Detectors.setDetectors([Detectors.Paging])
  GSMReadings.GSMReadings.remove({})
  Status.ensureDefault()
  ARFCNs.ARFCNs.remove({})
  Detectors.Paging.reset()
}
_.each(['tmsi', 'imsi'], function(page) {
  Tinytest.add("Detectors - Paging - Test " + page , function (test) {
    setup()

    var arfcnId = ARFCNs.ARFCNs.insert({
      channelNumber: 123,
      arfcnBandId: "test",
      startFreq: 10,
      centerFreq: 11,
      endFreq: 13
    })


    // First reading has diff value
    var r = {
      arfcnId: arfcnId,
      scanner: "test",
      frequency: 123,
      timestamp: new Date()
    }
    r[page] = 2134
    GSMReadings.GSMReadings.insert(r)

    // Enough on the same to trigger one warning
    for(let i=1; i<40; i++) {
      let reading = {
        arfcnId: arfcnId,
        scanner: "test",
        frequency: 123,
        timestamp: new Date()
      }
      GSMReadings.GSMReadings.insert(reading)
      reading[page] = 123
      GSMReadings.GSMReadings.insert(reading)
    }

    test.equal(ARFCNs.ARFCNs.findOne(arfcnId).numPages, 3)
    test.equal(Status.threatScore(), 30)
    test.equal(Threats.Threats.find().count(), 1)
  })
})
