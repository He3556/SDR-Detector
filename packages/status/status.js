Status = {
  Status: CollectionName = new Mongo.Collection("StatusStatus"),
  ensureDefault: function() {
    if (Status.Status.find({}).count() === 0) {
      Status.Status.insert({
        status: "Initializing",
        isStartup: true,
        startRecordingAt: new Date(),
        numPages: 0
      })
    }
  },
  status: function() {
    this.ensureDefault()
    return this.Status.findOne()
  },
  get: function() {
    if(this.status())
      return this.status().status

    return "Starting up..."
  },
  isStartingUp: function() {
    return this.status().isStartingUp
  },
  set: function(status) {
    if(this.status()) {
      this.Status.update(this.status()._id, {$set: {status: status}})
      console.log(status);
    }
  },
  setIsStartup: function(isStartup) {
    this.Status.update(this.status()._id, {$set: {isStartup: isStartup}})
  },
  setStartRecordingAt: function(startRecordingAt) {
    this.Status.update(this.status()._id, {$set: {startRecordingAt: startRecordingAt}})
  },
  threatScore: function() {
    var threats = Threats.Threats.find({timestamp: {$gte: this.status().startRecordingAt}}).fetch()
    return _.reduce(threats, function(score, threat) {
      return score + threat.score
    }, 0)
  },
  threatLevel: function() {
    var score = this.threatScore()
    var level =  _.find(Threats.LEVELS, function(_level) {
      return score >= _level.min && score <= _level.max
    })

    if(level)
      return level.name

    return THREATS.UNDEFINED
  },
}

if(Meteor.isClient){
  Tracker.autorun(function() {
    Status.threatScore = function() {
      var threats = Threats.Threats.find({timestamp: {$gte: this.status().startRecordingAt}}).fetch()
      return _.reduce(threats, function(score, threat) {
        return score + threat.score
      }, 0)
    }
  });

  Tracker.autorun(function() {
    Status.threatLevel = function() {
      var score = Status.threatScore()
      var level =  _.find(Threats.LEVELS, function(_level) {
        return score >= _level.min && score <= _level.max
      })

      return level.name
    }
  });
}

Meteor.startup(function(){
  Status.ensureDefault()
});

Status.Status.attachSchema(new SimpleSchema({
  status: {
    type: String,
  },
  isStartup: {
    type: Boolean
  },
  startRecordingAt: {
    type: Date
  }
}))


// Equivalent of autopublish and insecure plugins
// TODO REMOVE FOR SECURITY

if(Meteor.isServer) {
  Meteor.publish("status", function() {
    return Status.Status.find()
  });
}

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe('status')
  });
}

Status.Status.allow({
  insert: function() {
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
