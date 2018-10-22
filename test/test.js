/* eslint-disable */
const assert = require('assert')
const Parser = require('../csvparser.js')
const fs = require('fs')

const simpleTest = {
  headers: ['NAME'],
  rows: [['Lisa Simpson'], ['Bart Simpson']]
}

const commaTextOnlyTest = {
  headers: ['NAME', 'AGE'],
  rows: [['Lisa Simpson', 'eight'], ['Bart Simpson', 'nine']]
}

const commaInQuotes = { 
  headers: ['NAME', 'AGE'],
  rows: [['Simpson, Lisa', 'eight'], ['Simpson, Bart', 'nine']]
}

const embeddedLineBreaks = {
  headers: ['NAME', 'AGE'],
  rows: [['Lisa\nSimpson', 'eight'], ['Bart\nSimpson', 'nine']]
}

const doubleQuotes = {
  headers: ['NAME', 'AGE'],
  rows: [['Lisa "the sax" Simpson', 'eight'], ['Bart "the menace" Simpson', 'nine']]
}

const exampleData = {
  headers: [],
  rows: [
  ['John','Doe','120 jefferson st.','Riverside', 'NJ', '08075'],
  ['Jack','McGinnis','220 hobo Av.','Phila', 'PA','09119'],
  ['John "Da Man"','Repici','120 Jefferson St.','Riverside', 'NJ','08075'],
  ['Stephen','Tyler','7452 Terrace "At the Plaza" road','SomeTown','SD', '91234'],
  ['','Blankman','','SomeTown', 'SD', '00298'],
  ['Joan "the bone", Anne','Jet','9th, at Terrace plc','Desert City','CO','00123']
  ]
  
  
}

const parsedCheck = { 
  headers: ['NAME', 'AGE'],
  rows: [['Lisa Simpson', 8], ['Bart Simpson', 9]]
}

describe('Import module', function() {
  describe('import', function() {
    //tests
    it('imports the Parser module', function() {
      assert(Parser !== null)
    })  
  })
  describe('create parser object', function() {
    it('creates a new parser object from the imported Parser class', function() {
      p = new Parser(true, ',')
      assert(p !== null)
    })      
  })
})

describe('Split into rows', function() {
  describe('split simple (one entry per row) into individual rows', function() {
    let p = new Parser(true, ',')
    fs.readFile(__dirname + '/testfiles/simple.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, simpleTest)
    })
  })
  describe('don\'t split on separator in quotes', function() {
    let p = new Parser(true, ',')
    fs.readFile(__dirname + '/testfiles/comma_in_quotes.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, commaInQuotes)
    })
  })
  describe('handle embedded line breaks', function() {
    let p = new Parser(true, ',')
    fs.readFile(__dirname + '/testfiles/embedded_line_breaks.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, embeddedLineBreaks)
    })
  })
})

describe('Split data entries on separator', function() {
  let p = new Parser(true, ',')
  describe('split on comma, only text entries, no commas in quotes', function() {
    fs.readFile(__dirname + '/testfiles/comma_text_only.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, commaTextOnlyTest)
    })
  })
  describe('split on different separator', function() {
    let p = new Parser(true, '|')
    fs.readFile(__dirname + '/testfiles/separators.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, commaTextOnlyTest)
    })
  })
  describe('ignore leading and trailing whitespace', function() {
    let p = new Parser(true, ',')
    fs.readFile(__dirname + '/testfiles/whitespace.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, commaTextOnlyTest)
    })
  })
})

describe('Handle double quotes', function() {
  let p = new Parser(true, ',')
  describe('double quotes inside quotes should become single quotes', function() {
    fs.readFile(__dirname + '/testfiles/double_quotes.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, doubleQuotes)
    })
  })
})
