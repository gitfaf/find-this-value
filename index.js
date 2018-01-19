function findThisValue(obj, val, match) {
  const keys = Object.keys(obj)
  return keys.some(k => {
    if (typeof obj[k] === typeof {}) {
      return findThisValue(obj[k], val, match)
    }
    return match(obj[k], val)
  })
}

module.exports = findThisValue
