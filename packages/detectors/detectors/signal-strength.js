var _previous = []
var _maxLength = 10
Detectors.SignalStrength = {
  name: "SignalStrength",
  preRun: function(gsmReading) {
    var ss = gsmReading.signalStrength

    if(!!ss){
      if(_previous.length === _maxLength) {
        let avg = _.reduce(_previous, function(sum, sss) {
          return sum + sss
        }, 0) / _previous.length
        if(ss >= (avg*20)) {
          Threats.Threats.insert({
            timestamp: new Date(),
            gsmReadingId: gsmReading._id,
            score: 60,
            detector: "SignalStrength",
            message: "Signal Strength " + ss + " exceeded average " + avg + " by " + (ss-avg)/avg*100 + "% [+60 score]"
          })
        } else if(ss >= (avg*15)) {
          Threats.Threats.insert({
            timestamp: new Date(),
            gsmReadingId: gsmReading._id,
            score: 30,
            detector: "SignalStrength",
            message: "Signal Strength " + ss + " exceeded average " + avg + " by " + (ss-avg)/avg*100 + "% [+30 score]"
          })
        }

        _previous.pop()
      }
      _previous.push(ss)
    }
  },
  postRun: function(gsmReading) {
  },
  reset: function() {
    _previous = []
  }
}
