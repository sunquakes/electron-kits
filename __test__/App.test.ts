import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'
import router from '../src/router/index'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

test('Test User.vue', async () => {
  const wrapper = shallowMount(App, {
    propsData: {},
    stubs: ['router-link', 'router-view'],
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.exists()).toBe(true)
})
