const expect = require('chai').expect
const ftv = require('../index')
const equater = (a, b) => a === b

describe('find this value', () => {

  it('finds that value successfully in single level object', () => {
    const obj = {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    }
    const expected = true
    const findWhat = 'bb'
    expect(ftv(obj, findWhat, equater)).to.equal(expected)
  })

  it('finds that value successfully in multiple level object', () => {
    const obj = {
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
    const expected = true
    const findWhat = 'val-2'
    expect(ftv(obj, findWhat, equater)).to.equal(expected)
  })

  it('does not find given value successfully in multiple level object', () => {
    const obj = {
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
    const expected = false
    const findWhat = 'val-4'
    expect(ftv(obj, findWhat, equater)).to.equal(expected)
  })

})
