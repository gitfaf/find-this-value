function findThisValue(obj, val, match, where) {
  match = match || ((a, b) => a === b)
  where = where || ''
  const keys = Object.keys(obj)
  const found = keys.some(k => {
    where += `${k}.`
    if (typeof obj[k] === typeof {}) {
      return findThisValue(obj[k], val, match, where).found
    }
    return match(obj[k], val)
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
