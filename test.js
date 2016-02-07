require('locus')
var assert = require('assert')
var regex = require('./regex')

// eval(locus)
assert.equal("123 456 7890".match(regex).length, 1)
assert.equal("987-023-1234".match(regex).length, 1)
assert.equal("(878) 143-3456".match(regex).length, 1)
assert.equal("+8 123 121 9876".match(regex).length, 1)
assert.equal(
  "+8 123 121 9876 is one phone number and 123-456-7890 is another".match(regex).length
  , 2
)
assert.equal("NOT A PHONE NUMBER".match(regex), null)


console.log("=========================")
console.log("All tests pass")
console.log("=========================")