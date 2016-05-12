Meteor.methods({
  'games/hide-and-seek/play': function(loopForever) {

    Meteor.call('scanners/p1-rtlsdr-scanner/run', function(error, result) {
      Status.set('scanners/p1-rtlsdr-scanner/run FINISHED')

      Meteor.call('scanners/p2-airprobe/run', function(error, result) {
        Status.set('scanners/p2-airprobe/run FINISHED')

        Meteor.call('scanners/p3-airprobe/run', function(error, result) {
          Status.set('scanners/p3-airprobe/run FINISHED')

          if(loopForever)
            Meteor.call('games/hide-and-seek/play', loopForever)
        });
      });
    });
  },
});
