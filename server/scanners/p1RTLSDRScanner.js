Meteor.methods({
  'scanners/p1-rtlsdr-scanner/run':function() {
    GSMScanners.reset()
    Detectors.setDetectors([
      Detectors.MissingChannel,
      Detectors.NewChannel,
      Detectors.SignalStrength
    ])

    Status.set("Server building scans for P1 RTLSDR Scanner...")

    // Get all active ARFCNBands
    var arfcnBands = ARFCNBands.ARFCNBands.find({isActive: true}).fetch()

    // Build run instructions for each band and add to runOrder
    GSMScanners.runOrder = _.map(arfcnBands, function(band) {
      return {
        scanner: GSMScanners.P1RTLSDR_SCANNER,
        options: {
          arfcnBandId: band._id,
          pythonLocation: Meteor.settings.pythonLocation,
          rtlsdrscanLocation: Meteor.settings.rtlsdrscanLocation,
          numSweeps: Meteor.settings.quickScanNumSweeps,
          dwell: Meteor.settings.quickScanDwell,
          fft: Meteor.settings.quickScanFFT,
          logLocation: Meteor.settings.quickScanLogLocation
        }
      }
    })

    return doScan(function() {
      // Run MissingChannel detector at end of process
      Detectors.MissingChannel.nextIteration()
    })
  },
});
