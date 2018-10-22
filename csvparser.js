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
    for (let i = 0; i < this.parsed.rows.length; i++) {
      this.parsed.rows[i] = this.splitRowAtSeparator(this.parsed.rows[i][0])
    }
  }

  splitRowAtSeparator(row) {
    // takes a string and splits it on a separator char if that char is not inside quotes
    let inQuotes = false
    let entry = ''
    const separated = []
    for (let i = 0; i < row.length; i++) {
      const char = row[i]

      if (char === this.separator || char === '\n') {
        if (inQuotes) {
          entry += char
        } else {
          separated.push(entry)
          entry = ''
        }
      } else {
        if (char === '"') {
          inQuotes = !inQuotes
        } else {
          entry += char
        }
      }
    }
    separated.push(entry)

    return separated
  }
}
