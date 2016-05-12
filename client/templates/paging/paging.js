Template.Paging.helpers({
  basestations: function() {
    return Paging.Paging.find()
  },
  count: function() {
    return Paging.Paging.find().count()
  }
})


/*Template.Basestations.helpers({
  count: function(){
    return UniqueBTSs.find().count()
  },
  readings: function() {
    return Basestations.find({}, {
      sort: { MNC:1 }
    });
  }
});


Template.Basestations.helpers({
  recordedAt: function(){
     return new Date(this.timestamp)
  },
});

Template.country.helpers({
  getlocation: function() {
      return CountryCodes.findOne({ mcc: this.mcc });
   }
});
*/
    //var countryCodes = CountryCodes.get({_id: this.MCC});
    //return countryCodes.County;
    //return UniqueBTSs.find().count()
  //return UniqueBTSs.findOne(MCC)
