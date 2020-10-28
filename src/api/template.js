/* eslint-disable */
export default function (store) {
  return {
  user: {
      test: (payload, shouldDispatch = true) => {
        return store.dispatch('api', {
          apiMethod: 'user.test',
          payload,
          shouldDispatch
        }, {
          root: true
        })
      },
    },
  }
}
