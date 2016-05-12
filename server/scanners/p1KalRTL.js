Meteor.methods({
  'scanners/p1-kal-rtl/run': function() {
    GSMScanners.reset()

    Detectors.setDetectors([
      Detectors.MissingChannel,
      Detectors.NewChannel,
      Detectors.SignalStrength
    ])

    Status.set("Server building scans for P1Kal...")

    // Get all active ARFCNBands
    var arfcnBands = ARFCNBands.ARFCNBands.find({isActive: true}).fetch()

    // Build run instructions for each band and add to runOrder
    GSMScanners.runOrder = _.map(arfcnBands, function(band) {
      return {
        scanner: GSMScanners.P1Kal,
        options: {
          arfcnBandId: band._id,
          threshold: 101,
          kalLocation: Meteor.settings.kalRTLLocation
        }
      }
    })

    return doScan(function() {
      // Run MissingChannel detector at end of process
      Detectors.MissingChannel.nextIteration()
    })
  },
})
