Basestations = {
  Basestations: new Mongo.Collection("Basestations"),
  IMMUTABLE_FIELDS: ['cid', 'arfcnId', 'lac', 'mnc', 'mcc']
}

Basestations.Basestations.attachSchema(new SimpleSchema({
  firstSeen: {
    type: Date,
    denyUpdate: true
  },
  lastSeen: {
    type: Date
  },
  arfcnId: {
    type: String,
    denyUpdate: true
  },
  lastARFCNId: {
    type: String,
    optional: true,
  },
  cid: {
    type: Number,
    denyUpdate: true
  },
  mcc: {
    type: Number,
    denyUpdate: true
  },
  mnc: {
    type: Number,
    denyUpdate: true
  },
  lac: {
    type: Number,
    denyUpdate: true
  },
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("basestations", function() {
    return Basestations.Basestations.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('basestations')
  });
}

Basestations.Basestations.allow({
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
