ARFCNBands = {
  ARFCNBands: new Mongo.Collection("ARFCNBands"),
  arfcnBand: function(arfcnBandId) {
    return this.ARFCNBands.findOne(arfcnBandId)
  },
  centerFreq: function(arfcnBandId) {
    var band = this.arfcnBand(arfcnBandId)
    var centerFreq = math.chain(band.m)
                          .multiply((band.startARFCN + band.endARFCN)/2)
                          .add(band.b)
    return prettyNumber(centerFreq.done())
  },
  // Get ARFCN arguments for an arfcnBandId and specific channel
  getARFCN: function(arfcnBandId, channelNumber) {
    var band = this.arfcnBand(arfcnBandId)
    var centerFrequency = math.chain(band.m)
                          .multiply(channelNumber)
                          .add(band.b)

    var radius = math.chain(band.m).divide(2).done()

    return {
      channelNumber: channelNumber,
      arfcnBandId: arfcnBandId,
      startFreq: prettyNumber(centerFrequency.subtract(radius).done()),
      centerFreq: prettyNumber(centerFrequency.done()),
      endFreq: prettyNumber(centerFrequency.add(radius).done()),
    }
  },
  createARFCNs: function(arfcnId, callback) {
    var arfcnBand = this.arfcnBand(arfcnId)

    var counter = 0

    for(var i = arfcnBand.startARFCN; i <= arfcnBand.endARFCN; i++) {
      newARFCN = this.getARFCN(arfcnId, i)
      var oldARFCN = ARFCNs.ARFCNs.findOne(newARFCN);

      if(oldARFCN) {
        // skip already exists
      } else {
        ARFCNs.ARFCNs.insert(_.extend(newARFCN, {lastSeen: 0}), function(error, result) {
          if(error)
            callback(error)

          counter++;
        })
      }
      if(i === arfcnBand.endARFCN && !!callback)
        callback(undefined, counter)
    }
  }
}

var prettyNumber = function(number) {
  return parseFloat(math.format(number, {precision: 14}))
}

var numWDecimals = function(number, numDecimals) {
  // return (number * 10^numDecimals) / 10^numDecimals
  return number
}

ARFCNBands.ARFCNBands.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  startARFCN: {
    type: Number,
  },
  endARFCN: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  // Individual ARFCNs will be generated following the formula
  // ARFCN_Center_Freq = m * ARFCN + b
  m: {
    type: Number,
    decimal: true
  },
  b: {
    type: Number,
    decimal: true
  }
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("arfcn-bands", function() {
    return ARFCNBands.ARFCNBands.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('arfcn-bands')
  });
}

ARFCNBands.ARFCNBands.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
