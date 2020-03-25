import client from './client'
import { request } from './config'

export default async (resource, method, payload = {}) => {
  const response = await request[resource][method](client(), payload)

  return response
}
