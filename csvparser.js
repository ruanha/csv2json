module.exports = class {
  constructor(header, separator) {
    this.separator = separator
    this.header = header
    this.parsed = {
      headers: [],
      rows: [],
    }
  }

  parse(data) {
    this.splitDataToRows(data)
    if (this.header) {
      this.parsed.headers = this.parsed.rows.shift()
    }
    console.log(this.parsed)
  }

  splitDataToRows(data) {
    let rowString = ""
    for (let i = 0; i < data.length; i++) {
      let char = data.charAt(i)
      if (char === '\n') {
        this.parsed.rows.push([rowString])
        rowString = ""
      } else {
        rowString += char
      }
    }
  }
}
