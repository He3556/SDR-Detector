CountryCodes.seed = function() {
  if(CountryCodes.CountryCodes.find().count() === 0) {
    var json = {};

    json = JSON.parse(Assets.getText("private/mcc-mnc-table.json"));
    _.each(json, function(o) {
      mcc = parseInt(o.mcc)
      mnc = parseInt(o.mnc)

      if(mcc && mnc) {
        CountryCodes.CountryCodes.insert({
          MCC: mcc,
          MNC: mnc,
          ISO: o.iso,
          Country: o.country,
          CountryCode: o.country_code,
          Network: o.network
        })
      }

    })

    Status.set(CountryCodes.CountryCodes.find().count() + " country codes created");
  }
}
