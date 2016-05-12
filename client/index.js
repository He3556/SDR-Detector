Template.titleBarRight.helpers({
  currentStatus: function() {
    return Status.get()
  }
});

Template.titleBar.helpers({
  threatLevel: function() {
    return Status.threatLevel() || "UNDEFINED"
  },
  threatScore: function() {
    return Status.threatScore()
  },
  numPages: function() {
    return Status.numPages() || 0 // not necessary on clean app install
  },
  location: function() {
    var bts = Basestations.Basestations.findOne({mcc: {$gt: 1}})
    if(bts) {
      var cc = CountryCodes.CountryCodes.findOne({MCC: bts.mcc})

      if(cc)
        return cc.Country + " (" + bts.mcc + ")"
    }
  }
});
