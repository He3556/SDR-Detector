Tinytest.add('Detectors - Missing Channel - Test', function(test) {
  ARFCNs.ARFCNs.remove({})
  Threats.Threats.remove({})
  Detectors.MissingChannel.reset()

  Detectors.MissingChannel.preRun({
    arfcnId: "11",
    signalStrength: 123
  })
  Detectors.MissingChannel.preRun({
    arfcnId: "22",
    signalStrength: 123
  })
  Detectors.MissingChannel.nextIteration()
  Detectors.MissingChannel.preRun({
    arfcnId: "22",
    signalStrength: 123
  })
  Detectors.MissingChannel.nextIteration()

  test.equal(Status.threatScore(), 30)
  test.equal(Threats.Threats.find().count(), 1)
})
