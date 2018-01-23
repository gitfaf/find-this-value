const DEFAULT_STRING = ''
const DEFAULT_OBJECT = {}
const TYPEOF_OBJECT = typeof DEFAULT_OBJECT

const DEFAULT_COMPARE = (a, b) => typeof a === typeof b && a === b

const getDefaultLocation = location => location ? location : []
const getDefaultObject = input => input || DEFAULT_OBJECT
const getDefaultCompare = compare => compare || DEFAULT_COMPARE

const isObject = input => typeof input === TYPEOF_OBJECT

const removeLastCharacter = input => {
  return input.substr(0, input.length - 1)
}

/**
 *
 * @param {Object} inputObject - The object that somewhere deep down has the value you are interested in.
 * @param {*} toFind - Default string; if not, then compare function has to provide compare functionality
 * @param {Function} compareFn - compare function
 */
function findThisValue(inputObject, toFind, compareFn) {
  if (!inputObject || !toFind) {
    return {
      found: false,
      location: undefined
    }
  }
  const out = find(inputObject, toFind, compareFn)
  if (out.found) {
    out.location = out.location && out.location.join('.') || undefined
  } else {
    out.location = undefined
  }
  return out
}

const find = (inputObject, toFind, compareFn, location) => {
  inputObject = getDefaultObject(inputObject)
  compareFn = getDefaultCompare(compareFn)
  location = getDefaultLocation(location)
  const keys = Object.keys(inputObject)
  let found = false

  for (let i = 0; i < keys.length && !found; i++) {
    const k = keys[i]
    const o = inputObject[k]
    location.push(k)
    console.log(location)
    if (isObject(o)) {
      return find(o, toFind, compareFn, location)
    }
    found = compareFn(o, toFind)
    if (!found) {
      location.pop()
    }
  }

  return {
    found,
    location
  }
}

module.exports = findThisValue
