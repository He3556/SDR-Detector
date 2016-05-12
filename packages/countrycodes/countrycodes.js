CountryCodes = {}
CountryCodes.CountryCodes = new Mongo.Collection("countryCodes");
// All readings should point to an ARFCN
/*GSMReadings.GSMReadings.before.insert(function(userId, doc) {
  ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastSeen: doc.timestamp}})

  if(doc.signalStrength)
    ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastSignalStrength: doc.signalStrength}})
})
*/

// Some readings should create a new BTs and some should update lastRecorded of ARFCN
/*GSMReadings.GSMReadings.before.insert(function(userId, doc) {
  var containsValidBTS = Basestations.Basestations.simpleSchema().namedContext()
    .validateOne(doc, "cid", {modifier: false});

  if(containsValidBTS) {
    ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastRecorded: new Date()}})
    Basestations.Basestations.upsert({cid: doc.cid},
      {$set: {
          cid: doc.cid,
          lastSeen: new Date(),
      },
      $setOnInsert: {
        firstSeen: new Date()
      }})
  }
})
*/


CountryCodes.CountryCodes.attachSchema(new SimpleSchema({
  MCC: {
    type: Number,
    denyUpdate: true
  },
  MCCint: {
    type: Number,
    denyUpdate: true,
    optional: true
  },
  MNC: {
    type: Number,
    denyUpdate: true
  },
  MNCint: {
    type: Number,
    denyUpdate: true,
    optional: true
  },
  ISO: {
    type: String,
    denyUpdate: true
  },
  Country: {
    type: String,
    denyUpdate: true
  },
  CountryCode: {
    type: String,
    denyUpdate: true
  },
  Network: {
    type: String,
    denyUpdate: true,
    optional: true
  }
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("countryCodes", function() {
    return CountryCodes.CountryCodes.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('countryCodes')
  });
}
