module.exports = class {
  constructor(headerBool, separator) {
    this.separator = separator
    this.headerBool = headerBool
    this.parsed = {
      headers: [],
      rows: [],
    }
  }

  parse(data) {
    this.splitDataToRows(data)
    if (this.headerBool) {
      this.parsed.headers = this.parsed.rows.shift()
    }
    this.splitHeaders()
    this.splitDataEntries()
  }

  splitDataToRows(data) {
    let rowString = ''
    for (let i = 0; i < data.length; i++) {
      const char = data.charAt(i)
      if (char === '\n') {
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
    console.log("now do this:", this.parsed.rows)
    for (let i = 0; i < this.parsed.rows.length; i++) {
      console.log("specifically this:", this.parsed.rows[i][0])
      this.parsed.rows[i] = this.splitRowAtSeparator(this.parsed.rows[i][0])
    }
  }

  splitRowAtSeparator(row) {
    return row.split(this.separator)
  }
}
