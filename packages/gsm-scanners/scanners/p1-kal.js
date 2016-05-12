GSMScanners.P1Kal = {
  _arfcnBandId: null,
  _threshold: null,
  // options: arfcnBandId, threshold
  run: function(options, callback) {
    Status.set("Entering P1HackRF...")
    this._arfcnBandId = options.arfcnBandId
    this._threshold = options.threshold
    scan(options, callback)
  },
  arfcnBandToCommand: function(arfcnBandId) {
    var centerFreq = ARFCNBands.centerFreq(arfcnBandId)

    var band = _.find(bandCMDConversion, function(band) {
      return centerFreq >= band.startFrequency &&
      centerFreq <= band.endFrequency
    })

    return band.name
  },
  _testParseOutput: function(data) {
    parseOutput(data)
  }
}

var scan = function(options, callback) {
  Status.set("Scanning P1Kal...")
  var spawn = Npm.require('child_process').spawn;

  var kalBand = options.kalBand || GSMScanners.P1Kal.arfcnBandToCommand(options.arfcnBandId)
  var cmd = spawn(options.kalLocation,[
    '-s', kalBand,
  ])

  cmd.stdout.on('data', Meteor.bindEnvironment(
    function (data) {
      Status.set("P1Kal (stdout): " + data)
      parseOutput(data)
    },
    function () {Status.set("P1Kal error handling data")}
  ));

  cmd.stderr.on('data', Meteor.bindEnvironment(
    function (data) {
      // Status.set("P1RTLSDR (stderr)" + data)
    },
    function () {Status.set("P1HackRF error handling error")}
  ));

  cmd.on('exit', Meteor.bindEnvironment(
    function (code) {
      Status.set("P1HackRF exiting w/ code " + code + " ...")
      if(code == 0) { // success
        return callback(undefined, true)
      }
      callback(code)
    },
    function () {Status.set("P1HackRF error exiting")}
  ));

}

var parseOutput = function(data) {
  data = data.toString()
  var pat = /\s+chan\:\s([0-9]+)\s\(([0-9]+\.?[0-9]*).*[\+\-]\s([0-9]+\.?[0-9]*).*power:\s([0-9]+\.?[0-9]*)/
  var regx = new RegExp(pat)

  _.each(data.split('\n'), function(line) {
    // Status.set("Testing line: " + line)
    if(regx.test(line)) {
      // Status.set("Line passed: " + line)
      var channel = parseInt(regx.exec(line)[1])
      var freq = parseFloat(regx.exec(line)[2])
      var offset = parseFloat(regx.exec(line)[3])
      var power = parseFloat(regx.exec(line)[4])
      // Status.set("channel: " + channel)
      // Status.set("freq: " + freq)
      // Status.set("offset: " + offset)
      // Status.set("power: " + power)

      arfcn = ARFCNs.ARFCNs.findOne({
        // arfcnBandId: GSMScanners.P1Kal._arfcnBandId,
        channelNumber: channel
      })

      if(arfcn) {
        reading = {
          timestamp: new Date(),
          arfcnId: arfcn._id,
          scanner: "P1Kal",
          frequency: freq,
          signalStrength: GSMScanners.P1Kal._threshold
        }

        GSMReadings.GSMReadings.insert(reading)
      }
    }
  })
}

var bandCMDConversion = [
  {
    name: "GSM850",
    startFrequency: 869.2,
    endFrequency: 893.8
  },
  {
    name: "GSM900",
    startFrequency: 925,
    endFrequency: 960
  },
  {
    name: "GSM-R",
    startFrequency: 921.0,
    endFrequency: 960.0
  },
  {
    name: "EGSM",
    startFrequency: 925.0,
    endFrequency: 960.0
  },
  {
    name: "DCS",
    startFrequency: 1805.2,
    endFrequency: 1879.8
  },
  {
    name: "PCS",
    startFrequency: 1850.2,
    endFrequency: 1989.8
  },
]
