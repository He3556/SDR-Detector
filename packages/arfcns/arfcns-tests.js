if(Meteor.isServer) {
  Tinytest.add('ARFCNs - findOneByFreq', function (test) {
    ARFCNs.ARFCNs.remove({})
    var arfcn1 = {
      channelNumber: 123,
      arfcnBandId: "test",
      startFreq: 10,
      centerFreq: 11,
      endFreq: 13
    }
    var arfcn2 = {
      channelNumber: 456,
      arfcnBandId: "test",
      startFreq: 100,
      centerFreq: 110,
      endFreq: 130
    }
    var arfcn3 = {
      channelNumber: 789,
      arfcnBandId: "test",
      startFreq: 1000,
      centerFreq: 1100,
      endFreq: 1300
    }
    var arfcn1Id = ARFCNs.ARFCNs.insert(arfcn1)
    var arfcn2Id = ARFCNs.ARFCNs.insert(arfcn2)
    var arfcn3Id = ARFCNs.ARFCNs.insert(arfcn3)

    test.equal(ARFCNs.findOneByFreq(12)._id, arfcn1Id)
    test.equal(ARFCNs.findOneByFreq(130)._id, arfcn2Id)
    test.equal(ARFCNs.findOneByFreq(1000)._id, arfcn3Id)
    test.equal(ARFCNs.findOneByFreq(12.01)._id, arfcn1Id)
    test.equal(ARFCNs.findOneByFreq(130.0000)._id, arfcn2Id)
    test.equal(ARFCNs.findOneByFreq(1000.000001)._id, arfcn3Id)
  })
}
