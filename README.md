# collect-phone-numbers

Given a directory of files (text or otherwise), `collect-phone-numbers` will parse each file in the directory, extract phone numbers, and write comma-separated values to a new file.

**Note**: this is something that's probably best accomplished using grep (or AWK or some other command line utility).

`egrep "\b[[:digit:]]{3}(-|\s|.)?[[:digit:]]{3}(-|\s|.)?[[:digit:]]{4}\b" ./* > ./nums.txt`

##Installation

`npm install collect-phone-numbers`

##Tests

`npm run test`


##Usage

Running `collect-phone-numbers` in a specific directory will parse each file in that directory and output a `phone-numbers.csv` file with phone numbers. Alternatively, `collect-phone-numbers [directory of files to input] [filename to export]` will parse each file in the directory provided, outputting to the filepath and name provided.

![gif.gif](http://s14.postimg.org/coddm1pup/collect.gif)


##Implementation

This project uses:
* regex to parse text for patterns of ### ### #### separated by dashes, periods, or spaces, and accounting for parens around area code and plus sign for country code.
* node filesystem module for `readdir`, `readFfile`, and `writeFile`.
* the [async](https://github.com/caolan/async) utilities for a synchronized `forEach` callback (write file when done asynchronously iterating through all files in directory).
* basic tests using node's core `assert` module
