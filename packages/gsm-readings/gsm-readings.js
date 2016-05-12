GSMReadings = {
  ssThreshold: 100
}

GSMReadings.GSMReadings = new Mongo.Collection("GSMReadings");

// All readings should point to an ARFCN
GSMReadings.GSMReadings.before.insert(function(userId, doc) {
  // Run detections before any other action
  Detectors.preRun(doc)

  var now = new Date()

  // update last time any data came in over ARFCN
  ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastSeen: doc.timestamp}})

  // Update last signal strengtj
  if(doc.signalStrength)
    ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastSignalStrength: doc.signalStrength}})

  var containsValidBTS = _.reduce(Basestations.IMMUTABLE_FIELDS, function(passes, field) {
    return passes && Basestations.Basestations.simpleSchema().namedContext().validateOne(doc, field, {modifier: false})
  }, true)

  // console.log("contains valid data: " + containsValidBTS);
  if(containsValidBTS) {
    // Update last time ARFCN recorded a reading
    ARFCNs.ARFCNs.update(doc.arfcnId, {$set: {lastRecorded: now}})

    ////////////////
    // Some readings should create a new BTs and some should update lastRecorded of ARFCN

    // Put values required for a BTS in an array
    var btsVals = _.map(Basestations.IMMUTABLE_FIELDS, function(field) {
      return doc[field]
    })

    // Build obj of required BTS fields
    var bts = _.object(Basestations.IMMUTABLE_FIELDS, btsVals)

    // Check if BTS already exists for this.
    // ARFCN is the only field that will always be added to a BTS when discovered.
    var existingBTS = Basestations.Basestations.findOne({arfcnId: bts.arfcnId})
    if(!!existingBTS) {
      // set last ARFCN, update timestamps
      Basestations.Basestations.update(existingBTS._id, {$set: {
        lastSeen: now
      }})
    } else { // Create a new BTS
      _.extend(bts, {
        firstSeen: now,
        lastSeen: now
      })

      Basestations.Basestations.insert(bts)
    }
  }

  // Run detections after all action
  Detectors.postRun(doc)
})

GSMReadings.GSMReadings.attachSchema(new SimpleSchema({
  timestamp: {
    type: Date,
    denyUpdate: true
  },
  frequency: {
    type: Number,
    decimal: true,
    denyUpdate: true
  },
  arfcnId: {
    type: String,
    denyUpdate: true
  },
  scanner: {
    type: String,
    denyUpdate: true
  },
  cid: {
    type: Number,
    optional: true,
    denyUpdate: true
  },
  mcc: {
    type: Number,
    optional: true,
    denyUpdate: true
  },
  mnc: {
    type: Number,
    optional: true,
    denyUpdate: true
  },
  lac: {
    type: Number,
    optional: true,
    denyUpdate: true
  },
  signalStrength: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  signalNoise: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  locUpTimer: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  /**
  pagingChannel: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  mobileIdentity: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  **/
  imsi: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  tmsi: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  }
  /**
   statusPagingChannel: {
    type: Number,
    decimal: true,
    optional: true,
    denyUpdate: true
  },
  **/
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("gsm-readings", function() {
    return GSMReadings.GSMReadings.find({}, {
      sort: { timestamp: -1 },
      limit: 100
    });
  });

  Meteor.publish("gsm-readings/signal-strength", function(arfcnId) {
    return  GSMReadings.GSMReadings.find({
      arfcnId: arfcnId,
      signalStrength: {$gt: -100}
    }, {sort: {timestamp: -1}})
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('gsm-readings')
  });
}

GSMReadings.GSMReadings.allow({
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
