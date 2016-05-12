// cid1,arfcn1 -> cid1,arfcn1 (one bts: <cid=cid1, arfcn=arfcn1, lastArfcn=arfcn1>): no detection
// cid1,arfcn1 -> cid1,arfcn2 (two bts: <cid1,arfcn1,undefined> , <cid1,arfcn2,undefined>): detection until startup details resolved
// cid1,arfcn1 -> cid2,arfcn1 (one bts: <cid1,arfcn1,arfcn1>): yes detection - detection tested seperately
// mcc+mnc same behavior as CID

var setup = function() {
  Basestations.Basestations.remove({})
}

// cid1,arfcn1 -> cid1,arfcn1 (one bts: <cid=cid1, arfcn=arfcn1, lastArfcn=arfcn1>):
// no detection - detection tested seperately
Tinytest.add('GSMReadings - Normal operation', function (test) {
  setup()

  GSMReadings.GSMReadings.insert({
    cid: 1,
    mcc: 34512,
    mnc: 234,
    lac: 2343,
    arfcnId: "a1",
    scanner: "test",
    frequency: 123,
    timestamp: new Date()
  })

  GSMReadings.GSMReadings.insert({
    cid: 1,
    arfcnId: "a1",
    scanner: "test",
    frequency: 123,
    mcc: 34512,
    mnc: 234,
    lac: 2343,
    timestamp: new Date()
  })

  var bts = Basestations.Basestations.findOne()

  test.equal(Basestations.Basestations.find().count(), 1)
  test.equal(bts.cid, 1)
  test.equal(bts.arfcnId, "a1")
})

// A new ARFCN creates a new BTS
// cid1,arfcn1 -> cid1,arfcn2 (two bts: <cid1,arfcn1,undefined> , <cid1,arfcn2,undefined>):
// detection until startup details resolved - detection tested seperately
Tinytest.add('GSMReadings - New ARFCN', function (test) {
  setup()

  GSMReadings.GSMReadings.insert({
    cid: 1,
    arfcnId: "a1",
    scanner: "test",
    frequency: 123,
    mcc: 34512,
    mnc: 234,
    lac: 2343,
    timestamp: new Date()
  })

  GSMReadings.GSMReadings.insert({
    cid: 1,
    arfcnId: "a2",
    scanner: "test",
    frequency: 123,
    mcc: 34512,
    mnc: 234,
    lac: 2343,
    timestamp: new Date()
  })

  var bts1 = Basestations.Basestations.findOne({arfcnId: "a1"})
  var bts2 = Basestations.Basestations.findOne({arfcnId: "a2"})

  test.equal(Basestations.Basestations.find().count(), 2)
  test.equal(bts1.cid, 1)
  test.equal(bts1.arfcnId, "a1")
  test.equal(bts1.lastARFCNId, undefined)
  test.equal(bts2.cid, 1)
  test.equal(bts2.arfcnId, "a2")

  GSMReadings.GSMReadings.insert({
    cid: 1,
    arfcnId: "a1",
    scanner: "test",
    frequency: 123,
    mcc: 34512,
    mnc: 234,
    lac: 2343,
    timestamp: new Date()
  })

  var bts1 = Basestations.Basestations.findOne({arfcnId: "a1"})

  test.equal(Basestations.Basestations.find().count(), 2)
  test.equal(bts1.cid, 1)
  test.equal(bts1.arfcnId, "a1")
})

// example: cid1,arfcn1 -> cid2,arfcn1 (one bts: <cid1,arfcn1,arfcn1>):
// mcc+mnc same behavior as CID
// yes detection - detection tested seperately
var requiredFields = ["cid", "mnc", "mcc", "lac"]
_.each(requiredFields, function(field) {
  var title = 'GSMReadings - Changing ' + field + " does not create new BTS"
  Tinytest.add(title , function (test) {
    setup()

    var reading = {
      arfcnId: "a1",
      scanner: "test",
      frequency: 123,
      timestamp: new Date()
    }
    // Add the required fields to the reading.
    // They will not change during testing.
    var staticFields = _.difference(requiredFields, [field])
    _.each(staticFields, function(staticField) {
      reading[staticField] = 923874
    })
    reading[field] = 243
    GSMReadings.GSMReadings.insert(reading)

    reading[field] = 4349
    GSMReadings.GSMReadings.insert(reading)

    var bts1 = Basestations.Basestations.findOne({arfcnId: "a1"})
    test.equal(bts1.arfcnId, "a1")
    test.equal(bts1[field], 243) // should keep the original value
  })
})
