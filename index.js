require('locus')
var fs = require('fs')
var async = require('async')
var path = require('path')
var regex = require('./regex')

module.exports = collectPhoneNumbers = function() {
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
