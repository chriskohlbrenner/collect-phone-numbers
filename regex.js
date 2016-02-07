// REGEX EXPLANATION
// non-numeric chars between segments       [-. (]*, [-. )]*, and [-. ]*
// optional country code                    (?:\+?(\d{1,3}))?
// required area code                       (\d{3})
// required first three digits              (\d{3})
// required last four digits                (\d{4})
// optional extension                       (?: *x(\d+))?
module.exports = /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?/g