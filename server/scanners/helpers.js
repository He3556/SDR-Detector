doScan = function(callback) {
  var scan = Meteor.wrapAsync(GSMScanners.runThroughN, GSMScanners)
  try {
    res = scan(1)

    if(callback)
      callback()
  } catch (error) {
    throw new Meteor.Error("scan-error", error.message);
  }
  return res
}

Meteor.methods({
  setDetectors: function(detectorList) {
    var detectors = []
     _.each(detectorList, function(detector) {
       if(detector === Detectors.ChangingBasestation.name) {
         detectors.push(Detectors.ChangingBasestation)
       } else if (detector === Detectors.MissingChannel.name) {
         detectors.push(Detectors.MissingChannel)
       } else if (detector === Detectors.NewChannel.name) {
         detectors.push(Detectors.NewChannel)
       } else if (detector === Detectors.Paging.name) {
         detectors.push(Detectors.Paging)
       } else if (detector === Detectors.SignalStrength.name) {
         detectors.push(Detectors.SignalStrength)
       }
     })

     Detectors.setDetectors(detectors)

     return true
  }
});
