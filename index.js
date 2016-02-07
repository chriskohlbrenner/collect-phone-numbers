require('locus')
var fs = require('fs')
var async = require('async')
var path = require('path')

module.exports = collectPhoneNumbers = function() {
  // REGEX EXPLANATION
  // non-numeric chars between segments       [-. (]*, [-. )]*, and [-. ]*
  // optional country code                    (?:\+?(\d{1,3}))?
  // required area code                       (\d{3})
  // required first three digits              (\d{3})
  // required last four digits                (\d{4})
  // optional extension                       (?: *x(\d+))?
  var regex = /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?/g
  
  var inputDirectory = path.resolve(process.cwd(), (process.argv[2] || ""))
  var outputFile = path.resolve(process.cwd(), (process.argv[3] || "phone-numbers.csv"))

  fs.readdir(inputDirectory, function (err, list) {
    var numbers = []
    async.forEach(list, function (file, callback) {
      fs.readFile(inputDirectory + "/" + file, 'utf8', function (err, data) {
        if (data) {
          var matches = data.match(regex)
          if (matches) {
            console.log("Phone numbers found in " + file + ": " + matches)
            numbers = numbers.concat(matches)
          }
        }
        callback()
      })
    }, function(err) {
      if (numbers.length === 0) {
        console.log("No phone numbers found.")
      } else {
        fs.writeFile(outputFile, numbers.join(",\n"), function(err) {
          if (err) throw err;
          console.log("Saved phone numbers in " + outputFile)
        })
      }
    })
  })
}
