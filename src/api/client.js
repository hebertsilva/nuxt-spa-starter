import axios from 'axios'
import { baseUrl } from './config'

export default () => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    validateStatus (status) {
      return status >= 200 && status <= 600
    }
  })
}
