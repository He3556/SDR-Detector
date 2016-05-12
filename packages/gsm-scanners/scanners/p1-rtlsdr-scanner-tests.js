if(Meteor.isServer) {
  Tinytest.add('GSMScanners - P1RTLSDR - testParseRow', function (test) {
    function removeAll() {
      ARFCNs.ARFCNs.remove({})
      test.equal(ARFCNs.ARFCNs.find({}).count(), 0)
      GSMReadings.GSMReadings.remove({})
      test.equal(GSMReadings.GSMReadings.find({}).count(), 0)
    }

    removeAll()
    var arfcn1 = {
      channelNumber: 600,
      arfcnBandId: "test",
      startFreq: 867,
      centerFreq: 868,
      endFreq: 869
    }
    var arfcn1Id = ARFCNs.ARFCNs.insert(arfcn1)

    var arfcn2 = {
      channelNumber: 700,
      arfcnBandId: "test",
      startFreq: 877,
      centerFreq: 878,
      endFreq: 879
    }
    var arfcn2Id = ARFCNs.ARFCNs.insert(arfcn2)

    var arfcn3 = {
      channelNumber: 900,
      arfcnBandId: "test",
      startFreq: 889,
      centerFreq: 890,
      endFreq: 891
    }
    var arfcn3Id = ARFCNs.ARFCNs.insert(arfcn3)

    GSMScanners.P1RTLSDR_SCANNER.testParseScanOutput({
      logLocation: Meteor.settings.testing.testRTLSDRScannerCSV
    })

    // New reading should be created for row
    test.equal(GSMReadings.GSMReadings.find().count(), 3)

    var reading1 = GSMReadings.GSMReadings.findOne({arfcnId: arfcn1Id})
    var arfcn1 = ARFCNs.ARFCNs.findOne(arfcn1Id)
    test.equal(reading1.timestamp, new Date(1447999247))
    test.equal(reading1.frequency, 868.0)
    test.equal(reading1.signalStrength, -37.4672271523)
    test.equal(reading1.scanner, "P1RTLSDR")
    test.isNotUndefined(arfcn1.firstSeen)
    test.isNotUndefined(arfcn1.lastSeen)
    test.equal(arfcn1.lastSignalStrength, reading1.signalStrength)

    var reading2 = GSMReadings.GSMReadings.findOne({arfcnId: arfcn2Id})
    var arfcn2 = ARFCNs.ARFCNs.findOne(arfcn2Id)
    test.equal(reading2.timestamp, new Date(1447999247))
    test.equal(reading2.frequency, 878.041015625)
    test.equal(reading2.signalStrength, -42.7910412278)
    test.equal(reading2.scanner, "P1RTLSDR")
    test.isNotUndefined(arfcn2.firstSeen)
    test.isNotUndefined(arfcn2.lastSeen)
    test.equal(arfcn2.lastSignalStrength, reading2.signalStrength)

    var reading3 = GSMReadings.GSMReadings.findOne({arfcnId: arfcn3Id})
    var arfcn3 = ARFCNs.ARFCNs.findOne(arfcn3Id)
    test.equal(reading3.timestamp, new Date(1447999247))
    test.equal(reading3.frequency, 890.36328125)
    test.equal(reading3.signalStrength, -48.5179004445)
    test.equal(reading3.scanner, "P1RTLSDR")
    test.isNotUndefined(arfcn3.firstSeen)
    test.isNotUndefined(arfcn3.lastSeen)
    test.equal(arfcn3.lastSignalStrength, reading3.signalStrength)
  })
}
