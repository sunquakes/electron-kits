import { mount } from '@vue/test-utils'
import Antd from 'ant-design-vue'
import Layout from '../../src/components/Layout.vue'
import BreadCrumb from '../../src/components/layout/BreadCrumb.vue'
import Footer from '../../src/components/layout/Footer.vue'
import Header from '../../src/components/layout/Header.vue'
import Logo from '../../src/components/layout/Logo.vue'
import Menu from '../../src/components/layout/Menu.vue'
import i18n from '../../src/i18n'
import router from '../../src/router/index'
import store from '../../src/store/index'

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

test('Test Layout.vue', async () => {
  await router.push({ name: 'User' })
  const wrapper = mount(Layout, {
    propsData: {},
    global: {
      plugins: [Antd, router, store, i18n],
      components: {
        BreadCrumb,
        Footer,
        Header,
        Logo,
        Menu
      }
    }
  })
  expect(wrapper.exists()).toBe(true)
})
