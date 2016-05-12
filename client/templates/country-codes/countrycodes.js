Template.countryCodes.helpers({
  getlocation: function() {
    return CountryCodes.CountryCodes.findOne() || "UNDEFINED"
  }
});

    //var countryCodes = CountryCodes.get({_id: this.MCC});
    //return countryCodes.County;
    //return UniqueBTSs.find().count()
  //return UniqueBTSs.findOne(MCC)
