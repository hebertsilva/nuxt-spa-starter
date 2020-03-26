import client from './client'
import { api } from './config'

function translatePath (path) {
  path = path.split('-')

  if (path.length === 1) {
    return path[0]
  } else if (path.length > 1) {
    const parts = path.slice(1).map((part) => {
      return `${part[0].toUpperCase()}${part.slice(1)}`
    })

    return `${path[0]}${parts.join('')}`
  } else {
    return path
  }
}

export default async (resource, method, payload = {}) => {
  method = translatePath(method)

  const request = {
    payload,
    config: {}
  }

  const response = await api[resource][method](client(), request)

  return response
}
