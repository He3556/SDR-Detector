if(Meteor.isServer) {
  Tinytest.addAsync('GSMScanners - run multiple scanners in correct order', function(test, done) {
    GSMScanners._current = 0 // reset counter
    GSMScanners.runOrder = [
      {scanner: GSMScanners.TestScanner, options: {}},
      {scanner: GSMScanners.TestScanner},
      {scanner: GSMScanners.TestScanner, options: {}}
    ]
    // TODO, have locked stop scans after a certain time
    GSMScanners.runN(5, function(error, response) {
      test.isUndefined(error, "Could not run scanner " + response + " - ")

      test.equal(response, 2)
      done()
    })
  })
}
