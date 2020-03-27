# Nuxt SPA Boilerplate

> Boilerplate Nuxt mode SPA with request API from Client

## Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production 
$ yarn build

# execute build
$ yarn start

# generate static project
$ yarn generate
```

## Usage

Use request from API

> Aoós o Request a action é executada, pode ser cancelada passando o parametro na `shouldDispatch`. _Example: await this.$api.[resource][method](payload, shouldDispatch)_

```js
  const { data, status } = await this.$api.[resource][method](payload) // ex: this.$api.user.me({ id: 123 })
```

Use request from Store

```js
  await this.$store.$api[resource][method](payload) // ex: this.$store.$api.user.me({ id: 123 })
```

# Environment variable

Create file `.env` at project root or edit `/src/envs.js`

_Example by https://jsonplaceholder.typicode.com/_

```json
  API_BASE_URL: 'https://jsonplaceholder.typicode.com/'
```