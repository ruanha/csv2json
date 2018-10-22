/*
AUTHOR: Rune Hartvig
CONTACT: rune_hartvig@hotmail.com
*/

module.exports = class {
  /*
  DESCRIPTION
  ----------
  A class for parsing raw csv data (from a string) into an object (p) that separates
  the csv data into: 1) a list of the csv-headers (if any) in p.parsed.headers and
  2) the csv rows of data in p.parsed.rows, as a list of each row, which is
  represented as lists of the individual data entries:
    csv row: "Bart, Simpson, 9"
    p.parsed.rows[0] --> ['Bart', 'Simpson', '9']
  Notice that all parsed data entries are represented as strings.
  This parsed object makes it easy to further parse the data into for example a
  JSON format.

  SEE ALSO
  --------
  test/test.js and test/testfiles/...
  for a suite of tests of the csv parsing abilities of this module.

  PARAMETERS
  ----------
  isHeaderIncluded : Bool, default false
    If true, the first line is used to make a list of headers under parsed.headers
  separator : String, default ','
    The separator used in the csv file to separate entries
  parsed : Object
    the parsed data is stored as a property on the parsed object, if a header is set
    by 'isHeaderIncluded' a list of headers are accessed with:
      p.parsed.headers
    and the data rows are accessed with:
      p.parsed.rows

  USAGE
  -----
  //Import the class Parser from the module:
  const Parser = require('../csvparser.js')

  //Create a new object using the class Parser:
  let p = new Parser()

  //Call the parse method and give it some csv data as argument:
  p.parse(data)

  //The parsed data is stored in the parser object in the property 'parsed':
  console.log(p.parsed)
  */
  constructor(isHeaderIncluded = true, separator = ',') {
    this.separator = separator
    this.isHeaderIncluded = isHeaderIncluded
    this.parsed = {
      headers: [],
      rows: [],
    }
  }

  parse(data) {
    this.splitDataToRows(data)
    if (this.isHeaderIncluded) {
      this.parsed.headers = this.parsed.rows.shift()
      this.splitHeaders()
    }
    this.splitDataEntries()
  }

  splitDataToRows(data) {
    let inQuotes = false
    let rowString = ''
    for (let i = 0; i < data.length; i++) {
      const char = data.charAt(i)
      if (char === '"') {
        inQuotes = !inQuotes
      }
      if (char === '\n' && !inQuotes) {
        this.parsed.rows.push([rowString])
        rowString = ''
      } else {
        rowString += char
      }
    }
  }

  splitHeaders() {
    this.parsed.headers = this.splitRowAtSeparator(this.parsed.headers[0])
  }

  splitDataEntries() {
    for (let i = 0; i < this.parsed.rows.length; i++) {
      this.parsed.rows[i] = this.splitRowAtSeparator(this.parsed.rows[i][0])
    }
  }

  splitRowAtSeparator(row) {
    let inQuotes = false
    let entry = ''
    const separated = []
    for (let i = 0; i < row.length; i++) {
      const char = row[i]

      if (char === this.separator || char === '\n') {
        if (inQuotes) {
          entry += char
        } else {
          if (entry[0] === '"') {
            entry = entry.slice(1, -1)
            entry = entry.replace(/""/g, '"')
          }
          separated.push(entry.trim())
          entry = ''
        }
      } else if (char === '"') {
        inQuotes = !inQuotes
        entry += char
      } else {
        entry += char
      }
    }
    separated.push(entry.trim())

    return separated
  }
}
