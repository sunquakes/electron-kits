import { mount } from '@vue/test-utils'
import Login from '../../src/components/Login.vue'
import Antd from 'ant-design-vue'
import store from '../../src/store'
import i18n from '../../src/i18n'

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

test('Test Login.vue', async () => {
  const wrapper = mount(Login, {
    propsData: {},
    global: {
      plugins: [Antd, store, i18n]
    }
  })
  expect(wrapper.exists()).toBe(true)
})
