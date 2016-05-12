var maxReadings = {}
GSMScanners.P1RTLSDR_SCANNER = {
  // options: arfcnBandId, pythonLocation, rtlsdrscanLocation, numSweeps, dwell, fft, logLocation
  run: function(options, callback) {
    Status.set("Entering P1RTLSDR...")
    maxReadings = {}
    arfcnBand = ARFCNBands.ARFCNBands.findOne(options.arfcnBandId)
    scan(arfcnBand, options, callback)
  },
  testParseScanOutput: function(options) {
    maxReadings = {}
    parseScanOutput(options)
  }
}

// {pythonLocation: , rtlsdrscanLocation: , numSweeps: , dwell: , fft: , logLocation:}
var scan = function(arfcnBand, options, callback) {
  Status.set("Scanning P1RTLSDR...")
  var spawn = Npm.require('child_process').spawn;

  var startARFCN = ARFCNs.ARFCNs.findOne({arfcnBandId: arfcnBand._id, channelNumber: arfcnBand.startARFCN})
  var endARFCN = ARFCNs.ARFCNs.findOne({arfcnBandId: arfcnBand._id, channelNumber: arfcnBand.endARFCN})

  // Give some padding freq to the scanner
  // need to be whole integers
  var startScanAtFreq = parseInt(startARFCN.startFreq) - 2
  var endScanAtFreq = parseInt(endARFCN.endFreq) + 2
  Status.set("Scanning " + startScanAtFreq + "MHz - " + endScanAtFreq + "MHz")
  var cmd = spawn(options.pythonLocation, [
    options.rtlsdrscanLocation, // scan with RTLSDR-Scanner
    '-s', startScanAtFreq, // start at frequency
    '-e', endScanAtFreq, // end at frequency
    '-w', options.numSweeps, // number of sweeps
    '-d', options.dwell, // dwell (ms),
    '-f', options.fft, // number of fft bins
    options.logLocation // output dir for scan results
  ])

  cmd.stdout.on('data', Meteor.bindEnvironment(
    function (data) {
      // Status.set("P1RTLSDR (stdout): " + data)
    },
    function () {
      // Status.set("P1RTLSDR error handling data")
    }
  ));

  cmd.stderr.on('data', Meteor.bindEnvironment(
    function (data) {
      // Status.set("P1RTLSDR (stderr)" + data)
    },
    function () {Status.set("P1RTLSDR error handling error")}
  ));

  cmd.on('exit', Meteor.bindEnvironment(
    function (code) {
      // Status.set("P1RTLSDR exiting w/ code " + code + " ...")
      if(code == 0) { // success
        parseScanOutput(options)

        if(callback)
          callback(undefined, true)
      }
    },
    function () {
      // Status.set("P1RTLSDR error exiting")
    }
  ));
}

var parseScanOutput = function(options) {
  Status.set("P1RTLSDR parseScanOutput")
  var fs = Npm.require("fs")
  var scanFile = fs.readFileSync(options.logLocation, "utf8")

  Papa.parse(scanFile, {
    step: function(row) {
      parseRows(row.data)
    },
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })

  Status.set("P1RTLSDR parseScanOutput adding discovered readings...")
  _.each(maxReadings, function(reading, arfcnId) {
    GSMReadings.GSMReadings.insert(reading)
    ARFCNs.ARFCNs.update(reading.arfcnId, {$set: {
        lastSeen: new Date()
      },
      $setOnInsert: {
        firstSeen: new Date()
      }})
  })
  Status.set("P1RTLSDR parseScanOutput complete")
}

// Loop through rows in CSV and parse each one
var parseRows = function(rows) {
  // Status.set("P1RTLSDR parseRows")
  _.each(rows, function(row) {
    parseRow(row);
  })
}

// {
//   'Time (UTC)': 1447884411,
//   'Frequency (MHz)': 933.798828125,
//   'Level (dB/Hz)': -48.4894048613
// }
var parseRow = function(row, callback) {
  row = _.map(row, function(value, key) {
    return value;
  });

  // quit on malformed rows
  if(row.length != 3)
    return

  // Status.set("P1RTLSDR parseRow3: " + row[0] + ", "+ row[1] + ", "+ row[2])
  var arfcn = ARFCNs.findOneByFreq(row[1])

  if(arfcn) {
    if(maxReadings[arfcn._id] && maxReadings[arfcn._id].signalStrength > parseFloat(row[2])) {
      // Status.set("P1RTLSDR parseRow6: " + arfcn._id)
    } else {
      // Status.set("P1RTLSDR parseRow4: ")
      maxReadings[arfcn._id] = {
        timestamp: new Date(),
        frequency: row[1],
        scanner: "P1RTLSDR",
        arfcnId: arfcn._id,
        signalStrength: row[2]
      }
    }
  }
}
