import { resolve } from 'path'
import routes from './src/pages'
import envs from './src/envs'

function getAPITree () {
  const api = require(resolve(__dirname, 'src/client/resources'))
  return Object.keys(api.default)
    .reduce((rObj, resource) => {
      return {
        ...rObj,
        [resource]: Object.keys(api.default[resource])
          .reduce((mObj, method) => {
            return { ...mObj, [method]: true }
          }, {})
      }
    }, {})
}

export default {
  target: 'static',
  mode: 'spa',
  srcDir: 'src',
  telemetry: false,
  middleware: 'stats',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'prefetch',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900',
        as: 'font',
        family: 'Montserrat',
        onload: 'this.rel="stylesheet"'
      }
    ]
  },
  router: {
    middleware: 'stats',
    extendRoutes (nuxtRoutes, resolve) {
      nuxtRoutes.splice(0, nuxtRoutes.length, ...routes.map((route) => {
        return {
          ...route,
          component: resolve(__dirname, route.component)
        }
      }))
    }
  },
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      resolve(__dirname, 'src/sass/main.scss')
    ]
  },
  loading: {
    color: 'rgb(167, 40, 252)',
    height: '5px'
  },
  plugins: [
    '~/plugins/api'
  ],
  buildModules: [
    // empty
  ],
  build: {
    optimizeCSS: true,
    cssSourceMap: false,
    extractCSS: false,
    cache: true,
    publicPath: envs.PUBLIC_PATH,
    templates: [{
      options: { api: getAPITree() },
      src: './src/api.js.template',
      dst: '../src/api.js'
    }],
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      babelrc: true
    }
  }
}
