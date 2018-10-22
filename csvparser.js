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
    /* takes a string and splits it on a separator char if that char is not
    inside quotes
    */
    let inQuotes = false
    let entry = ''
    let separated = []
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
