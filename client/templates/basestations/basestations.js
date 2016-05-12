Template.Basestations.helpers({
  basestations: function() {
    return Basestations.Basestations.find()
  },
  count: function() {
    return Basestations.Basestations.find().count()
  },
});

Template.Basestation.onCreated(function() {
  var template = this
  this.autorun(function() {
    var arfcnId = Template.currentData().arfcnId
    template.subscribe('gsm-readings/signal-strength', arfcnId)
  })

})

Template.Basestation.helpers({
  pages: function() {
    var a = ARFCNs.ARFCNs.findOne(this.arfcnId)

    if(a)
      return a.numPages
  },
  arfcn: function() {
    var a = ARFCNs.ARFCNs.findOne(this.arfcnId)

    if(a)
      return a.channelNumber
  },
  signalStrength: function() {
    var r = GSMReadings.GSMReadings.findOne({
      arfcnId: this.arfcnId,
      signalStrength: {$gt: -100}
    }, {sort: {timestamp: -1}})

    if(r)
      return r.signalStrength
  },

  provider: function() {
    //console.log('provider');
    //console.log(this.mcc + " " + this.mnc);
    //this is only a test, find all documents with the same MCC. Only 2 will be found for MCC=262
          var pra = CountryCodes.CountryCodes.find({MCC: this.mcc}).fetch()
          //console.log(pra);
    // (test2)
          var prb = CountryCodes.CountryCodes.find({$and: [{MNC: this.mnc},{MCC: this.mcc}]}).fetch()
          //console.log(prb);
//this should actually do it (both conditions are linked with &)
      var pr = CountryCodes.CountryCodes.findOne({MCC: this.mcc, MNC: this.mnc})
      //console.log(pr);
      if(pr)
      {  return pr.Network }
      else { return 'nothing found' }
//but nothing found all the time...

  }
});

/** transform: function(doc) {
       doc.provider = CountryCodes.CountryCodes.findOne({
         mnc: { $in: [ doc.mnc ] }
       });
       return doc ;
     }
});
**/


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
