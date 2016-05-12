Tinytest.addAsync('CountryCodes - seed from JSON', function(test, done) {
  CountryCodes.CountryCodes.remove({})
  CountryCodes.seed()

  test.isTrue(CountryCodes.CountryCodes.find().count() > 0)
  done()
})
