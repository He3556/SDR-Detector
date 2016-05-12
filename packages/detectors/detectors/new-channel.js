Detectors.NewChannel = {
  name: "NewChannel",
  preRun: function(gsmReading) {
    var arfcn           = ARFCNs.ARFCNs.findOne(gsmReading.arfcnId),
        signalStrength  = gsmReading.signalStrength

    if(arfcn === undefined && signalStrength > Meteor.settings.quickScanTolerance) {
      var channel = arfcn ? arfcn.channelNumber : "unknown"
      Threats.Threats.insert({
        timestamp: new Date(),
        gsmReadingId: gsmReading._id,
        score: 60,
        detector: "NewChannel",
        message: "New channel (" + channel + ") detected with signal strength " + signalStrength + " [+60 score]"
      })
    }
  },
  postRun: function(gsmReading) {
  }
}
