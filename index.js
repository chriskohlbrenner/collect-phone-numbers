var fs = require('fs')
var async = require('async')


module.exports = collectPhoneNumbers = function() {
  var regex = /((\(\d{3}\)|\d{3})(-|\.|\s)\d{3}(-|\.|\s)\d{4}|\d{10})/g
  var inputDirectory
  if (process.argv[2]) {
    inputDirectory = __dirname + "/" + process.argv[2]
  } else {
    inputDirectory = "."
  }
  var outputFile = process.argv[3] || "phone-numbers.txt"

  fs.readdir(inputDirectory, function (err, list) {
    var numbers = []
    async.forEach(list, function (file, callback) {
      console.log(file)
      fs.readFile(__dirname + "/" + file, 'utf8', function (err, data) {
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
