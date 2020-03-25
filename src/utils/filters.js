export function isEmpty (obj = {}) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) { return false }
  }

  return true
}

export function isObject (obj) {
  const hasObject =
    obj !== null && typeof obj === 'object' && Array.isArray(obj) === false
  const hasArray = Array.isArray(obj) !== false

  return hasObject || hasArray
}
