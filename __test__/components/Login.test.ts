import sqlite3 from 'sqlite3'
import { mount } from '@vue/test-utils'
import Login from '../../src/components/Login.vue'
import Antd from 'ant-design-vue'
import store from '../../src/store'
import i18n from '../../src/i18n'

jest.mock('sqlite3')

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

describe('Test Login.vue', () => {
  const wrapper = mount(Login, {
    propsData: {},
    global: {
      plugins: [Antd, store, i18n]
    }
  })

  test('Mount component', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Submit the form', async () => {
    // Mock database instance
    sqlite3.Database = jest.fn().mockImplementation(() => {
      return {
        get: jest.fn(function (sql, callback) {
          callback(undefined, { id: 1, content: 'Hello World!', count: 1 })
        })
      }
    })

    // Input username and password.
    const usernameInput = wrapper.find('input[id="normal_login_username"]')
    const passwordInput = wrapper.find('input[id="normal_login_password"]')
    await usernameInput.setValue('admin')
    await passwordInput.setValue('admin')

    await wrapper.find('form').trigger('submit')
  })
})
