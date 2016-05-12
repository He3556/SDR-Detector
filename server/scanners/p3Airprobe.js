Meteor.methods({
  'scanners/p3-airprobe/run': function() {
    GSMScanners.reset()
    Detectors.Paging.reset()
    Detectors.setDetectors([
      Detectors.Paging,
    ])

    var basestations = Basestations.Basestations.find().fetch()

    GSMScanners.runOrder = _.map(basestations, function(basestation) {
      return {
        scanner: GSMScanners.P2BTS,
        options: {
          scanner: "P3BTS",
          fromFile: false,
          arfcnId: basestation.arfcnId,
          duration: Meteor.settings.deepScanPeriod,
          pythonLocation: Meteor.settings.pythonLocation,
          airprobeLocation: Meteor.settings.airprobeLocation,
          tSharkLocation: Meteor.settings.tSharkLocation,
          tSharkCaptures: [
            'gsm_a.imsi', // IMSI
            'gsm_a.tmsi', // TMSI
          ]
        }
      }
    })

    return doScan()
  },
});
