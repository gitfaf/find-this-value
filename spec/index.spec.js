const expect = require('chai').expect
const ftv = require('../index')
const equater = (a, b) => a === b

describe('find this value', () => {

  it('finds that value successfully in single level object', () => {
    const inputObject = {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    }
    const expected = {
      found: true,
      location: 'b'
    }
    const toFind = 'bb'
    expect(ftv(inputObject, toFind, equater)).to.deep.equal(expected)
  })

  it('finds that value successfully in multiple level object', () => {
    const inputObject = {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: [{
          key: 'key-1',
          val: 'val-1'
        },
        {
          key: 'key-2',
          val: 'val-2'
        },
        {
          key: 'key-3',
          val: 'val-3'
        }
      ]
    }
    const expected = {
      found: true,
      location: 'd.2.val'
    }
    const toFind = 'val-3'
    expect(ftv(inputObject, toFind, equater)).to.deep.equal(expected)
  })

  it('does not find given value successfully in multiple level object', () => {
    const inputObject = {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: [{
          key: 'key-1',
          val: 'val-1'
        },
        {
          key: 'key-2',
          val: 'val-2'
        },
        {
          key: 'key-3',
          val: 'val-3'
        }
      ]
    }
    const expected = {
      found: false,
      location: undefined
    }
    const toFind = 'val-4'
    expect(ftv(inputObject, toFind, equater)).to.deep.equal(expected)
  })

  it('does not find given value successfully in empty object', () => {
    const inputObject = {}
    const expected = {
      found: false,
      location: undefined
    }
    const toFind = 'val-4'
    expect(ftv(inputObject, toFind, equater)).to.deep.equal(expected)
  })

  it('does not find given value successfully in null or any falsey object', () => {
    const inputObject = null
    const expected = {
      found: false,
      location: undefined
    }
    const toFind = 'val-4'
    expect(ftv(inputObject, toFind, equater)).to.deep.equal(expected)
  })

  it('finds value via regex', () => {
    const inputObject = {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: [{
          key: 'key-1',
          val: 'val-1'
        },
        {
          key: 'key-2',
          val: 'val-2'
        },
        {
          key: 'key-3',
          val: 'val-3'
        }
      ]
    }
    const expected = {
      found: true,
      location: 'd.0.val'
    }
    const toFind = /v[a-z]{2}\-[0-9]/
    const compare = (objVal, what) => what.test(objVal)
    expect(ftv(inputObject, toFind, compare)).to.deep.equal(expected)
  })
})
