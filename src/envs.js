require('dotenv').config()

export default Object.assign({
  PUBLIC_PATH: '/_nuxt/',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com/' // Example by https://jsonplaceholder.typicode.com/
}, process.env)
