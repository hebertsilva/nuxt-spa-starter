import { isObject } from '~/utils/filters'

const convertChildrenErrors = (errors) => {
  if (errors instanceof Object) {
    const fieldError = {}

    Object.keys(errors).forEach((value) => {
      if (errors[value].length) {
        fieldError[value] = isObject(errors[value])
          ? errors[value].shift()
          : errors[value]
      }
    })

    return fieldError
  } else {
    return errors
  }
}

export function parseErrors (errors) {
  const fieldError = {}
  let fieldMethod = ''

  Object.keys(errors).forEach((field) => {
    fieldMethod = field
    const errosKey = errors[field]
    Object.keys(errosKey).forEach((value) => {
      if (errosKey[value].length) {
        fieldError[value] = isObject(errosKey[value])
          ? convertChildrenErrors(errosKey[value].shift())
          : errosKey[value]
      } else {
        fieldError[value] = errosKey[value]
      }
    })
  })

  return { [fieldMethod]: fieldError }
}
