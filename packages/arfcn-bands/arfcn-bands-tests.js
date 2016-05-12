Tinytest.addAsync('ARFCNBands - correct GSM 850 calculations', function(test, done) {
  var gsm850 = {
    "name": "GSM-850 Downlink",
    "startARFCN": 240,
    "endARFCN": 251,
    "isActive": true,
    "m": 0.2,
    "b": 843.6
  }

  ARFCNBands.ARFCNBands.insert(gsm850, test850ARFCNs)

  function test850ARFCNs(error, result) {
    if(error)
      test.fail("Could not create ARFCN Band for GSM 850 " + error)

    // give arfcn N and get center freq, upper freq, lower freq
    var arfcnBandId = result

    // 128 - start band
    var arfcn128 = {
      channelNumber: 128,
      arfcnBandId: arfcnBandId,
      startFreq: 869.1,
      centerFreq: 869.2,
      endFreq: 869.3,
    }
    test.equal(ARFCNBands.getARFCN(arfcnBandId, 128), arfcn128)

    // 251 - end band
    var arfcn251 = {
      channelNumber: 251,
      arfcnBandId: arfcnBandId,
      startFreq: 893.7,
      centerFreq: 893.8,
      endFreq: 893.9,
    }
    test.equal(ARFCNBands.getARFCN(arfcnBandId, 251), arfcn251)

    // 244 - mid band
    var arfcn244 = {
      channelNumber: 244,
      arfcnBandId: arfcnBandId,
      startFreq: 892.3,
      centerFreq: 892.4,
      endFreq: 892.5,
    }
    test.equal(ARFCNBands.getARFCN(arfcnBandId, 244), arfcn244)

    done()
  }
})

Tinytest.addAsync('ARFCNBands - create ARFCNs', function(test, done) {
  var gsm850 = {
    "name": "GSM-850 Downlink",
    "startARFCN": 240,
    "endARFCN": 251,
    "isActive": true,
    "m": 0.2,
    "b": 843.6
  }
  var arfcnBandId

  ARFCNBands.ARFCNBands.insert(gsm850, testCreateARFCNs)

  function testCreateARFCNs(error, result) {
    if(error)
      test.fail("Could not create ARFCN Band for GSM 850 " + error)

    // give arfcn N and get center freq, upper freq, lower freq
    arfcnBandId = result
    ARFCNBands.createARFCNs(arfcnBandId, onARFCNsCreated)
  }

  function onARFCNsCreated(error, result) {
    // test that right number of ARFCNs exist
    test.equal(ARFCNs.ARFCNs.find({arfcnBandId: arfcnBandId}).count(), 12)
    ARFCNBands.createARFCNs(arfcnBandId, onARFCNsRecreated)
  }

  function onARFCNsRecreated(error, result) {
    // test that same number of ARFCNs exist
    test.equal(ARFCNs.ARFCNs.find({arfcnBandId: arfcnBandId}).count(), 12)
    done()
  }
})
