Template.scanners.helpers({
  availableScanners: function() {
    return [
      {
        methodName: 'scanners/p1-rtlsdr-scanner/run',
        friendlyName: "Signal Strength (rtlsdr-sc.)",
      },
      {
        methodName: 'scanners/p2-airprobe/run',
        friendlyName: "Process 2 (airprobe)",
      },
      {
        methodName: 'scanners/p3-airprobe/run',
        friendlyName: "Process 3 (airprobe)",
      },
      {
        methodName: 'scanners/p1-kal-rtl/run',
        friendlyName: "Process 1 (kal-rtl)",
    /*  },
      {
        methodName: 'scanners/p1-kal-hackrf/run',
        friendlyName: "Process 1 (kal-hackrf) [unimpl.]",
  */    }
    ]
  }
});

Template.scanner.events({
  "click": function(event, template) {
    Status.set("Client started " + template.data.friendlyName)
    Meteor.call(template.data.methodName, function(error, result) {
      if(error)
        return Status.set(error.message)

      Status.set(template.data.friendlyName + " done running.")
    })
  }
});
