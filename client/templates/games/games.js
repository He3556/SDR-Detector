Template.games.helpers({
  availableGames: function() {
    return [
      {
        methodName: 'games/hide-and-seek/play',
        friendlyName: "Start (p1 = rtl-scanner)",
      },
      {
        methodName: 'games/trick-or-treat/play',
        friendlyName: "Start (p1 = kali)",
      },
    ]
  }
});

Template.game.events({
  "click": function(event, template){
    Meteor.call(template.data.methodName, true, function(error, result) {
      if(error)
        Status.set(error)

      Status.set(template.data.friendlyName + " started.")
    })
  }
});
