// Write your package code here!
ARFCNs = {
  ARFCNs: new Mongo.Collection("ARFCNs"),
  arfcn: function(arfcnId) {
    return this.ARFCNs.findOne(arfcnId)
  },
  // Find ARFCN that freq falls into
  // TODO ARFCNs should not overlap frequencies
  findOneByFreq: function(frequency) {
    return this.ARFCNs.findOne({ $and:
      [
        {startFreq: {$lte: frequency}},
        {endFreq: {$gte: frequency}}
      ]
    })
  },
}

ARFCNs.ARFCNs.attachSchema(new SimpleSchema({
  channelNumber: {
    type: Number,
    denyUpdate: true,
  },
  arfcnBandId: {
    type: String,
    denyUpdate: true,
  },
  startFreq: {
    type: Number,
    decimal: true,
    denyUpdate: true,
  },
  centerFreq: {
    type: Number,
    decimal: true,
    denyUpdate: true,
  },
  endFreq: {
    type: Number,
    decimal: true,
    denyUpdate: true
  },
  lastSeen: {
    type: Date,
    defaultValue: new Date(0)
  },
  lastSignalStrength: {
    type: Number,
    decimal: true,
    defaultValue: -999999
  },
  lastRecorded: {
    type: Date,
    defaultValue: new Date(0)
  },
  firstSeen: {
    type: Date,
    defaultValue: new Date(0)
  },
  numPages: {
    type: Number,
    defaultValue: 0
  }
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("arfcns", function() {
    return ARFCNs.ARFCNs.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('arfcns')
  });
}

ARFCNs.ARFCNs.allow({
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
