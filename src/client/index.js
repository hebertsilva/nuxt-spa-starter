import client from './client'
import { api } from './config'

export default async (resource, method, payload = {}) => {
  const request = {
    payload,
    config: {}
  }

  const response = await api[resource][method](client(), request)

  return response
}
