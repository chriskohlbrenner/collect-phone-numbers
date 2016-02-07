# collect-phone-numbers

**This project is experiemental and in progress!**

##Installation##

`npm install -g collect-phone-numbers`


##Usage##

`collect-phone-numbers [directory with text files] [file path for phone number CSV]`

![gif.gif](http://s10.postimg.org/eb8tsrig9/works.gif)


##Implementation##

This project uses:
* a simple regex to parse text for patterns of ### ### #### separated by dashes, periods, or spaces, and accounting for parens around area code.
* Node's filesystem for `readdir`, `readFfile`, and `writeFile`.
* the [async](https://github.com/caolan/async) utilities for a synchronized `forEach` callback (write file when done asynchronously iterating through all files in directory).
