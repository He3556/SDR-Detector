Threats = {
  LEVELS: [
    {name: "Green", min: -99999, max: 29}, // min/max are inclusive
    {name: "Yellow", min: 30, max: 59},
    {name: "Red", min: 60, max: 999999999}
  ],
  UNDEFINED: "ERROR CALCULATING"
}

Threats.Threats = new Mongo.Collection("Threats");

Threats.Threats.attachSchema(new SimpleSchema({
  timestamp: {
    type: Date,
    denyUpdate: true
  },
  gsmReadingId: {
    type: String,
    optional: true,
    denyUpdate: true
  },
  arfcnId: {
    type: String,
    denyUpdate: true,
    optional: true
  },
  basestationId: {
    type: String,
    denyUpdate: true,
    optional: true
  },
  score: {
    type: Number,
    denyUpdate: true,
  },
  detector: {
    type: String,
    denyUpdate: true
  },
  message: {
    type: String
  }
}))
