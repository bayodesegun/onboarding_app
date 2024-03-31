import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('Login component', () => {
  const onSubmit = vi.spyOn(Login.methods, 'onSubmit')
  const wrapper = mount(Login, {
    attachTo: document.body,
    global: {
      plugins: [vuetify]
    }
  })
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    wrapper.unmount()
  })
  it('renders and works properly', async () => {
    const username = wrapper.find('#username-field')
    const loginInBtn = wrapper.find('#login-btn')
    expect(wrapper.text()).toContain('Please enter your username')
    expect(username.exists()).toBe(true)
    expect(loginInBtn.exists()).toBe(true)
    expect(loginInBtn.text()).toBe('Log In')

    await username.setValue('test')
    await loginInBtn.trigger('click')
    vi.advanceTimersByTime(1001)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.username).toBe('test')
    expect(onSubmit).toHaveBeenCalled()
    expect(wrapper.emitted().login[0][0]).toBe('test')
  })
})
