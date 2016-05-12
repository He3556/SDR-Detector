Meteor.methods({
  'games/trick-or-treat/play': function(loopForever) {

    Meteor.call('scanners/p1-kal-rtl/run', function(error, result) {
      Status.set('scanners/p1-kal-rtl/run FINISHED')

      Meteor.call('scanners/p2-airprobe/run', function(error, result) {
        Status.set('scanners/p2-airprobe/run FINISHED')

        Meteor.call('scanners/p3-airprobe/run', function(error, result) {
          Status.set('scanners/p3-airprobe/run FINISHED')

          if(loopForever)
            Meteor.call("games/trick-or-treat/play", loopForever)
        });
      });
    });
  },
});
