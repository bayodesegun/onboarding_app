import { describe, it, expect, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Login from '@/components/Login.vue'
import LadderBoard from '@/components/LadderBoard.vue'
import App from '@/App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('App component', () => {
  it('renders and works properly', async () => {
    const login = vi.spyOn(App.methods, 'logIn')
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify],
        components: {
          Login,
          LadderBoard,
        }
      },
    })
    expect(wrapper.findComponent(Login).exists()).toBe(true)
    expect(wrapper.findComponent(LadderBoard).exists()).toBe(false)
    wrapper.findComponent(Login).vm.$emit('login', 'test')
    await wrapper.vm.$nextTick()
    expect(login).toHaveBeenCalled(1)
    expect(wrapper.vm.user).toBe('test')
    expect(wrapper.text()).toContain('Your journey to the finish line')
    expect(wrapper.find('#progress-bar').exists()).toBe(true)
    expect(wrapper.findComponent(LadderBoard).exists()).toBe(true)
  })
})
