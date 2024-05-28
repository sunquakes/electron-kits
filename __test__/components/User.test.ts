import { shallowMount } from '@vue/test-utils'
import User from '../../src/components/User.vue'
import Antd from 'ant-design-vue'
import i18n from '../../src/i18n'
import router from '../../src/router/index'

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
  const wrapper = shallowMount(User, {
    propsData: {},
    global: {
      plugins: [Antd, i18n]
    }
  })
  expect(wrapper.exists()).toBe(true)
})
