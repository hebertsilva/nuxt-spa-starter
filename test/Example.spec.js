import { shallowMount, config } from '@vue/test-utils'
import Example from '~/src/components/Example.vue'

config.mocks.$store = {
  state: {
    user: {},
    api: {
      loading: {}
    }
  }
}

const factory = () => {
  return shallowMount(Example, {
  })
}

describe('Example', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.exists()).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
