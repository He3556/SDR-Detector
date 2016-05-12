Detectors = {
  _detectors: [],
  setDetectors: function(detectors) {
    this._detectors = detectors
  },
  preRun: function(gsmReading) {
    _.each(this._detectors, function(detector) {
      detector.preRun(gsmReading)
    })
  },
  postRun: function(gsmReading) {
    _.each(this._detectors, function(detector) {
      detector.postRun(gsmReading)
    })
  },
}
