import api from '~/api'

// translateMethodToPath converts a string like
// service.doSomething() to service/do-something, so
// that it can be picked up by the API middleware in server/index.js
const translateMethodToPath = (name) => {
  return name.replace(/[A-Z]/g, l => `-${l.toLowerCase()}`).replace(/\./, '/')
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
    const response = await api(resource, apiPath, payload)

    if (response.status === 403) {
      return Promise.resolve({ ...response })
    } else {
      const { data, status } = response

      // Dispatch request action
      const dispatchPayload = { payload, data, status }
      const actionHandler = `${resource}/${method}`
      if (this.hasActionHandler(actionHandler) && shouldDispatch) {
        await dispatch(actionHandler, dispatchPayload)
      }

      if (status === 400) {
        commit('setErrors', { [apiMethod]: data })
      }

      commit('setRequestDone', apiMethod)

      return Promise.resolve({ data, status })
    }
  } catch (err) {
    commit('setErrors', { [apiMethod]: err })
  }
}
