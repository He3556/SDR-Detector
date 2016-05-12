_.extend(GSMScanners, {
  _locked: false,
  _current: 0,
  isLocked: function() {
    return this._locked
  },
  // [{scanner: SCANNER_OBJ, options: OPTIONS}]
  runOrder: [],
  reset: function() {
    this.runOrder = []
  },
  // Runs all the scanners in the list N times
  runThroughN: function(n, callback) {
    this._current = 0
    return this.runN(this.runOrder.length, callback)
  },
  // same thing as run but only for N iterations
  // callback after all N runs
  runN: function(n, callback) {
    var thiz = this
    if(n > 0) {
      thiz.runOne(thiz.currentIndex(), function(error, result) {
        thiz._current++
        thiz.runN(n-1, callback)
      })
    } else {
      callback(undefined, thiz.currentIndex())
    }
  },
  // LOOPS INFINITELY, BE SURE YOU WANT TO CALL THIS
  run: function(callback) {
    var thiz = this
    thiz.runOne(thiz.currentIndex(), function(error, result) {
      // if(error)
      //   callback(error)
      // callback(error, thiz.currentIndex())
      thiz._current++
      thiz.run(callback)
    })
  },
  // call back run at end of
  runOne: function(index, callback) {
    var scanner = this.runOrder[index].scanner
    var options = this.runOrder[index].options || {}
    scanner.run(options, callback)
  },
  currentIndex: function() {
    if(this._current && (this._current < this.runOrder.length))
      return this._current

    return this._current = 0
  }
})
