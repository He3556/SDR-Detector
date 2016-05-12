// Stores an array of counters for each <IMSI/TMSI, ARFCN, IMSI/TMSI Value> tuple
// Does not need to be persisted to DB because reset frequently
// Sample values:
// [
//   {
//     page: "imsi",
//     pageId: 1234,
//     arfcnId: 1,
//     count: 4
//   },
//   {
//     page: "tmsi",
//     pageId: 5678,
//     arfcnId: 4,
//     count: 5
//   },
//   {
//     page: "imsi",
//     pageId: 1234,
//     arfcnId: 6,
//     count: 88
//   }
// ]
var _readingCounters = []

Detectors.Paging = {
  name: "Paging",
  preRun: function(gsmReading) {
    // Count both IMSI and TMSI pages
    _.each(['tmsi', 'imsi'], function(page) {
      // Does this Reading contain an IMSI or TMSI
      if((gsmReading[page] !== undefined) && (gsmReading[page] > 0)) {
        // Find existing counter for each page (imsi or tmsi)
        var counterSelector = {
          page: page,
          arfcnId: gsmReading["arfcnId"],
          pageId: gsmReading[page]
        }

        var counter = _.findWhere(_readingCounters, counterSelector)
        if(counter) {
          // If counter already exists, increment count
          counter.count += 1
        } else {
          // If counter does not exist, create and set count to 1
          counter = _.extend(counterSelector, {count: 1})
          _readingCounters.push(counter)
        }

        var count = counter.count

        // Find ARFCN this page was broadcasted on
        var arfcn = ARFCNs.ARFCNs.findOne(counter.arfcnId)

        // If the count for this page is higher than
        // any other paging count on the same ARFCN,
        // set the count of the ARFCN = count of page
        if(arfcn && (arfcn.numPages < count)) {
          ARFCNs.ARFCNs.update(counter.arfcnId, {$set: {numPages: count}})

          // If the count for this page is also > 9,
          // add a new Threat w/ score 30.
          if(count >= 9) {
            Threats.Threats.insert({
              timestamp: new Date(),
              gsmReadingId: gsmReading._id,
              score: 30,
              detector: "Paging",
              message: page + " (" + counter.pageId + ") paging detected " + count + " times. [+30 score]"
            })
          }
        }

      }
    })
  },
  postRun: function(gsmReading) {
  },
  reset: function() {
    _readings = []
    ARFCNs.ARFCNs.update({}, {$set: {numPages: 0}})
  }
}
