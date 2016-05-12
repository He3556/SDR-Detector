// Write your package code here!
BTSBroadcasts = {
  BTSBroadcasts: new Mongo.Collection("BTSBroadcast"),
}

BTSBroadcasts.BTSBroadcasts.attachSchema(new SimpleSchema({
  arfcnId: {
    type: String,
    optional: true
  },
  basestationId: {
    type: String,
    optional: true
  },
  firstSeen: {
    type: Date
  },
  lastSeen: {
    type: Date
  }
}))

// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("bts-broadcasts", function() {
    return BTSBroadcasts.BTSBroadcasts.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('bts-broadcasts')
  });
}

BTSBroadcasts.BTSBroadcasts.allow({
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
