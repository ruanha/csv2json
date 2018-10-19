/* eslint-disable */
const assert = require('assert')
const Parser = require('../csvparser.js')
const fs = require('fs')

const simpleTest = {
  headers: ['NAME'],
  rows: [['Lisa Simpson'], ['Bart Simpson']]
}

const parsedCheck = { 
  headers: ['NAME', 'AGE'],
  rows: [['Lisa Simpson', 8], ['Bart Simpson', 9]]
}

describe('Import module', function() {
  describe('import', function() {
    //tests
    it('is imported', function() {
      assert(Parser !== null)
    })  
  })
})

describe('Split rows', function() {
  p = new Parser(true, ',')
  describe('async', function() {
    fs.readFile(__dirname + '/testfiles/simple.csv', 'utf-8', function(err, data) {
      p.parse(data)
    })
    
    it('is equal', function() {
      assert.deepEqual(p.parsed, simpleTest)
    })
  })
})
