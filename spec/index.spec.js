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
    const expected = {
      found: true,
      where: 'a.b'
    }
    const findWhat = 'bb'
    expect(ftv(obj, findWhat, equater)).to.deep.equal(expected)
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
    const expected = {
      found: true,
      where: 'a.b.c.d'
    }
    const findWhat = 'val-2'
    expect(ftv(obj, findWhat, equater)).to.deep.equal(expected)
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
    const expected = {
      found: false,
      where: undefined
    }
    const findWhat = 'val-4'
    expect(ftv(obj, findWhat, equater)).to.deep.equal(expected)
  })

  it('does not find given value successfully in empty object', () => {
    const obj = {}
    const expected = {
      found: false,
      where: undefined
    }
    const findWhat = 'val-4'
    expect(ftv(obj, findWhat, equater)).to.deep.equal(expected)
  })
  it('does not find given value successfully in null or any falsey object', () => {
    const obj = null
    const expected = {
      found: false,
      where: undefined
    }
    const findWhat = 'val-4'
    expect(ftv(obj, findWhat, equater)).to.deep.equal(expected)
  })
})
