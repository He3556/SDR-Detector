if(Meteor.isServer) {
  Tinytest.addAsync('GSMScanners - P2BTS - test scan from file', function(test, done) {
    GSMReadings.GSMReadings.remove({})
    var arfcn1 = {
      channelNumber: 123,
      arfcnBandId: "test",
      startFreq: 10,
      centerFreq: 11,
      endFreq: 13
    }
    var arfcn1Id = ARFCNs.ARFCNs.insert(arfcn1)
    // options: arfcnId, fromFile = true, fileLocation, tSharkLocation, [tsharkCaptures]
    GSMScanners.P2BTS.run({
      arfcnId: arfcn1Id,
      fromFile: true,
      fileLocation: Meteor.settings.testing.testPCAPFile,
      tSharkLocation: Meteor.settings.tSharkLocation,
      scanner: 'aTest',
      tSharkCaptures: [
        "gsm_a.bssmap.cell_ci", // CID
        'e212.mcc', // MCC
        'e212.mnc', // MNC
        'gsm_a.lac', // LAC
        'gsmtap.signal_dbm', // Signal Strength
        'gsmtap.snr_db', // Signal/Noise Ratio
        'gsm_a.rr.t3212' // location update timer
      ]
    }, function(error, result) {
      test.isUndefined(error)
      test.isTrue(GSMReadings.GSMReadings.find({scanner: "aTest"}).count() > 0)
      done()
    })


  })
}
