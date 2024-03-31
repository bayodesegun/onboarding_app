import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import LadderBoard from '@/components/LadderBoard.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')
const activities = [
  {
    name: 'Phase 1',
    order: 1,
  },
  {
    name: 'Phase 2',
    order: 2,
  },
  {
    name: 'Phase 3',
    order: 3,
  },
  {
    name: 'Phase 4',
    order: 4,
  },
  {
    name: 'Phase 5',
    order: 5,
  },
]
const progress = {
  total: 5,
  completed: 3,
  current: 3,
  board: {
    1: ['AA', ],
    2: ['AB'],
    3: ['YOU', 'AC'],
    4: ['AD'],
    5: ['AE'],
  }
}

describe('LadderBoard component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    wrapper.unmount()
  })
  const takeTraining = vi.spyOn(LadderBoard.methods, 'takeTraining')
  const wrapper = mount(LadderBoard, {
    attachTo: document.body,
    props: {
      activities: activities,
      progress: progress,
    },
    global: {
      plugins: [vuetify]
    }
  })
  it('renders and works properly', async () => {
    expect(wrapper.text()).toContain('Legend')
    expect(wrapper.text()).toContain('YOU')
    expect(wrapper.text()).toContain('Your colleagues')
    expect(wrapper.vm.learning).toBe(false)
    let base
    for (let order of [1, 2, 3, 4, 5]) {
      base = wrapper.find(`#ladder-base-${order}`)
      expect(base.find('h6').text()).toContain(`Phase ${order}`)
      if (order < 4) {
        expect(base.find('button').text()).toContain('Completed')
      }
      if (order === 4) {
        expect(base.find('button').text()).toContain('Take training')
        await base.find('button').trigger('click')
        expect(wrapper.vm.learning).toBe(true)
        expect(takeTraining).toHaveBeenCalled()
        vi.advanceTimersByTime(1001)
        expect(wrapper.vm.learning).toBe(false)
      }
      if (order === 5) {
        expect(base.find('button').text()).toContain('Locked')
      }
    }
    let stair, stairStep
    for (let order of [1, 2, 3, 4, 5]) {
      stair = wrapper.find(`#student-stair-${order}`)
      stairStep = stair.find(`#stair-step-${order}`)
      expect(stairStep.element.style.height).toBe(`${order * 30}px`)
      if (order === 3) {
        expect(stair.find('.mdi-walk').attributes('title')).toContain('You')
      }
      else if (order < 5) {
        expect(stair.find('.mdi-walk').attributes('title')).not.toContain('You')
        expect(stair.find('.mdi-walk').attributes('title')).toContain('your colleagues')
      }
      else {
        expect(stair.find('.mdi').attributes('title')).not.toContain('You')
        expect(stair.find('.mdi-trophy').attributes('title')).toContain('your colleagues')
      }
    }
  })
})
