const DEFAULT_STRING = ''
const DEFAULT_OBJECT = {}

const DEFAULT_COMPARE = (a, b) => a === b

const getDefaultString = input => input || DEFAULT_STRING
const getDefaultObject = input => input || DEFAULT_OBJECT
const getDefaultCompare = input => input || DEFAULT_COMPARE

const removeLastCharacter = input => {
  return input.substr(0, input.length - 1)
}

/**
 *
 * @param {Object} obj - The object that somewhere deep down has the value you are interested in.
 * @param {*} val - Default string; if not, then compare function has to provide compare functionality
 * @param {Function} compare - compare function
 */
function findThisValue(obj, val, compare, where) {
  const out = find(obj, val, compare, where)
  if(out.found) {
    out.where = removeLastCharacter(out.where)
  }
  return out
}

const find = (obj, val, compare, where) => {
  obj = getDefaultObject(obj)
  compare = getDefaultCompare(compare)
  where = getDefaultString(where)

  const keys = Object.keys(obj)

  const found = keys.some(k => {
    where += `${k}.`
    if (typeof obj[k] === typeof {}) {
      return find(obj[k], val, compare, where).found
    }
    return compare(obj[k], val)
  })

  return found ? {
    found,
    where
  } : {
    found,
    where: undefined
  }
}

module.exports = findThisValue
