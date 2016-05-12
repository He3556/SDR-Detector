var setup = function() {
  ARFCNs.ARFCNs.remove({})
  Threats.Threats.remove({})
  Detectors.SignalStrength.reset()

  // prepolutate with 10 readings
  Detectors.SignalStrength.reset()
  for(let i=0; i<10; i++) {
    Detectors.SignalStrength.preRun({
      arfcnId: "452sfg",
      signalStrength: 100,
    })
  }
}
Tinytest.add('Detectors - Signal Strength - 15% & 20% tests', function(test) {
  setup()

  // First X readings should not cause alarm
  test.equal(Status.threatScore(), 0)

  // 15% alarm for 30
  Detectors.SignalStrength.preRun({
    arfcnId: "452sfg",
    signalStrength: 115,
  })
  test.equal(Status.threatScore(), 30)
  test.equal(Threats.Threats.find().count(), 1)

  // reset test
  setup()

  // 20% alarm for 60
  Detectors.SignalStrength.preRun({
    arfcnId: "452sfg",
    signalStrength: 120,
  })
  test.equal(Status.threatScore(), 60)
  test.equal(Threats.Threats.find().count(), 1)
})
