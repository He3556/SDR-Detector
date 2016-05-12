var _knownChannels = []
var _detectedChannels = []
Detectors.MissingChannel = {
  name: "MissingChannel",
  preRun: function(gsmReading) {
    // if valid reading and channel not already detected
    if(gsmReading.signalStrength > Meteor.settings.quickScanTolerance &&
      !alreadyDetected(gsmReading)) {

      _detectedChannels.push(gsmReading.arfcnId)
      if(!alreadyKnown(gsmReading)) {
        _knownChannels.push(gsmReading.arfcnId)
      }
    }
  },
  postRun: function(gsmReading) {
  },
  nextIteration: function() {
    var diff = _.difference(_knownChannels, _detectedChannels)
    if(diff.length > 0) {
      _.each(diff, function(missingChan) {
        Threats.Threats.insert({
          timestamp: new Date(),
          score: 30,
          detector: "MissingChannel",
          message: "Missing channel (" + missingChan + ") not detected [+30 score]"
        })
      })
    }

    _detectedChannels = []
  },
  reset: function() {
    _detectedChannels = []
    _knownChannels = []
  }
}

var alreadyDetected = function(gsmReading) {
  _.find(_detectedChannels, function(arfcnId) {
    arfcnId === gsmReading.arfcnId
  })
}

var alreadyKnown = function(gsmReading) {
  _.find(_knownChannels, function(arfcnId) {
    arfcnId === gsmReading.arfcnId
  })
}
