Detectors.ChangingBasestation = {
  name: "ChangingBasestation",
  preRun: function(gsmReading) {
    var bts = Basestations.Basestations.findOne({arfcnId: gsmReading.arfcnId})
    if(!!bts) {
      var requiredFields = [
        {field: "cid", threatScore: 50},
        {field: "mnc", threatScore: 50},
        {field: "mcc", threatScore: 50},
        {field: "lac", threatScore: 30}
      ]
      _.each(requiredFields, function(row) {
        var field = row.field
        var originalValue = bts[field],
            newValue      = gsmReading[field]
        if(newValue !== originalValue) {
          Threats.Threats.insert({
            timestamp: new Date(),
            gsmReadingId: gsmReading._id,
            score: row.threatScore,
            detector: "ChangingBasestation",
            message: field + " changed from " + originalValue + " to " + newValue
          })
        }
      })
    }
  },
  postRun: function(gsmReading) {
  }
}
