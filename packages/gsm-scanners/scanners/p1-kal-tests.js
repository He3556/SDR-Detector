if(Meteor.isServer) {
  var gsm850 = {
    "name": "GSM-850 Downlink",
    "startARFCN": 240,
    "endARFCN": 251,
    "isActive": true,
    "m": 0.2,
    "b": 843.6
  }
  gsm850id = ARFCNBands.ARFCNBands.insert(gsm850)

  Tinytest.add('GSMScanners - P1Kal - arfcnBandToCommand GSM800', function (test) {
    test.equal(GSMScanners.P1Kal.arfcnBandToCommand(gsm850id), "GSM850")
  })

  var gsm9001 =  {
    name: "E-GSM-900 Downlink (0-124)",
    "startARFCN": 0,
    "endARFCN": 124,
    "isActive": true,
    "m": 0.2,
    "b": 935
  }
  gsm9001id = ARFCNBands.ARFCNBands.insert(gsm9001)
  Tinytest.add('GSMScanners - P1Kal - arfcnBandToCommand GSM900-1', function (test) {
    test.equal(GSMScanners.P1Kal.arfcnBandToCommand(gsm9001id), "GSM900")
  })

  var gsm9002 = {
    name: "E-GSM-900 Downlink (975-1023)",
    "startARFCN": 975,
    "endARFCN": 1023,
    "isActive": true,
    "m": 0.2,
    "b": 730.2
  }

  gsm9002id = ARFCNBands.ARFCNBands.insert(gsm9002)
  Tinytest.add('GSMScanners - P1Kal - arfcnBandToCommand GSM-900-2', function (test) {
    test.equal(GSMScanners.P1Kal.arfcnBandToCommand(gsm9002id), "GSM900")
  })

  Tinytest.add('GSMScanners - P1Kal - parseOutput', function (test) {
    GSMReadings.GSMReadings.remove({})
    var data = "GSM-850:\n" +
    "		chan: 22222222 (892.2MHz + 789Hz)	power: 82626.95\n" +
    "		chan: 11 (892.2MHz + 789Hz)	power: 9.95\n" +
    "		chan: 3 (892.2MHz + 789Hz)	power: 1.0"

     ARFCNs.ARFCNs.insert({
      channelNumber: 22222222,
      arfcnBandId: gsm850id,
      startFreq: 100,
      centerFreq: 110,
      endFreq: 130
    })

    ARFCNs.ARFCNs.insert({
      channelNumber: 11,
      arfcnBandId: gsm850id,
      startFreq: 100,
      centerFreq: 110,
      endFreq: 130
    })

    ARFCNs.ARFCNs.insert({
      channelNumber: 3,
      arfcnBandId: gsm850id,
      startFreq: 100,
      centerFreq: 110,
      endFreq: 130
    })

    GSMScanners.P1Kal._arfcnBandId = gsm850id
    GSMScanners.P1Kal._threshold = 9324
    GSMScanners.P1Kal._testParseOutput(data)
    var readings = GSMReadings.GSMReadings.find().fetch()

    test.equal(readings.length, 3)
    _.each(readings, function(reading) {
      test.equal(reading.frequency, 892.2)
      test.equal(reading.signalStrength, 9324)
    })
  })
}
