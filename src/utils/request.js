import client from '~/client'

// translateMethodToPath converts a string like
// service.doSomething() to service/do-something, so
// that it can be picked up by the API middleware in server/index.js
const translateMethodToPath = (name) => {
  return name.replace(/[A-Z]/g, l => `-${l.toLowerCase()}`).replace(/\./, '/')
}

// getData returns the results[] array if it's available,
// otherwise it returns the original JSON response
export function getData (response) {
  if (Array.isArray(response.data.results)) {
    return response.data.results
  } else {
    return response.data
  }
}

export default async function (
  { commit, dispatch, state },
  { apiMethod, payload, shouldDispatch = true }
) {
  commit('cleanErrors')
  commit('setRequestActive', apiMethod)

  try {
    const [resource, method] = apiMethod.split('.')
    const apiPath = translateMethodToPath(method)

    // Create request client-side
    const response = await client(resource, apiPath, payload)

    if (response.status === 403 && process.client) {
      this.app.$nuxt.error({ statusCode: 403 })
      return
    }

    const data = getData(response)
    const status = response.status

    // Dispatch request action
    const dispatchPayload = { payload, response, data }
    const actionHandler = `${resource}/${method}`
    if (this.hasActionHandler(actionHandler) && shouldDispatch) {
      await dispatch(actionHandler, dispatchPayload)
    }

    if (response.status === 400) {
      commit('setErrors', { [apiMethod]: data })
    }

    commit('setRequestDone', apiMethod)

    return Promise.resolve({ data, status })
  } catch (err) {
    commit('setErrors', { [apiMethod]: err })
  }
}
