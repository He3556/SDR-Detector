Tinytest.add('Detectors - New Channel - Test', function(test) {
  ARFCNs.ARFCNs.remove({})
  Threats.Threats.remove({})

  Detectors.NewChannel.preRun({
    arfcnId: "adfasdf",
    signalStrength: 123
  })

  test.equal(Status.threatScore(), 60)
  test.equal(Threats.Threats.find().count(), 1)
})
