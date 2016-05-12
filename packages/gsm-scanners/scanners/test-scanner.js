GSMScanners.TestScanner = {
  run: function(options, callback) {
    Meteor.setTimeout(function() {
      callback(undefined, true)
    }, 0.1 * 1000);
  }
}
