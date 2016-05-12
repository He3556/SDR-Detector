// Prepopulate with desired frequencies
// frequency will be calutated as f = mx + b
if(Meteor.isServer) {
  Meteor.startup(function() {
    prepopulateARFCNBands()
    CountryCodes.CountryCodes.remove({})
    CountryCodes.seed()
  });
}

prepopulateARFCNBands = function() {
  Status.set("prepopulateARFCNBands")
  if (ARFCNBands.ARFCNBands.find({}).count() === 0) {
    Status.set("No existing bands, creating...")
 var bands = [
     // { name: "GSM-850 Downlink", "startARFCN": 128, "endARFCN": 251, "isActive": false, "m": 0.2, "b": 843.6},
      { name: "E-GSM-900 Downlink (0-124)", "startARFCN": 0, "endARFCN": 174, "isActive": true, "m": 0.2, "b": 925},
    //  { name: "DCS-1800 Downlink (975-1023)", "startARFCN": 512, "endARFCN": 885, "isActive": true, "m": 0.2, "b": 1805},
    ]
    _.each(bands, function(arfcnBand) {
      var arfcnBandId = ARFCNBands.ARFCNBands.insert(arfcnBand);
      Status.set("Created band " + arfcnBand.name + " (" + arfcnBandId + ")")
      ARFCNBands.createARFCNs(arfcnBandId)
    });
  } else {
    Status.set("Bands already exists, skipping...")
  }
};
