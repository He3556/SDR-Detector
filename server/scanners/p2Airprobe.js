Meteor.methods({
  'scanners/p2-airprobe/run': function() {
    Status.set("Building scans for Process 2...")
    GSMScanners.reset()
    Detectors.setDetectors([
      Detectors.ChangingBasestation
    ])

    var threshold = Meteor.settings.quickScanTolerance
    var arfcns = ARFCNs.ARFCNs.find({$and: [
      {lastSignalStrength: {$gte: threshold}},
      {lastSeen: {$gt: new Date(0)}}
    ]}).fetch()

    if(arfcns.length > 0) {
      GSMScanners.runOrder = _.map(arfcns, function(arfcn) {
        return {
          scanner: GSMScanners.P2BTS,
          options: {
            scanner: "P2BTS",
            fromFile: false,
            arfcnId: arfcn._id,
            duration: Meteor.settings.deepScanPeriod,
            pythonLocation: Meteor.settings.pythonLocation,
            airprobeLocation: Meteor.settings.airprobeLocation,
            tSharkLocation: Meteor.settings.tSharkLocation,
            tSharkCaptures: [
              "gsm_a.bssmap.cell_ci", // CID
              'e212.mcc', // MCC
              'e212.mnc', // MNC
              'gsm_a.lac', // LAC
              'gsmtap.signal_dbm', // Signal Strength
              'gsmtap.snr_db', // Signal/Noise Ratio
              'gsm_a.rr.t3212' // location update timer
            ]
          }
        }
      })

      return doScan()
    }
  },
});
