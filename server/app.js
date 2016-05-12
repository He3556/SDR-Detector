Meteor.startup(function() {
  Status.set("Starting app...")
  prepopulateARFCNBands()
});
