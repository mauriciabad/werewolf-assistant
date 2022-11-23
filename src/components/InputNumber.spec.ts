import { describe, beforeEach, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumber from './InputNumber.vue'

const decreaseButtonSelector = '[data-testid=decrease-button]'
const increaseButtonSelector = '[data-testid=increase-button]'
const inputSelector = '[data-testid=input]'

describe('InputNumber component', () => {
  it('displays the prop value by default', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 3,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props('modelValue')).toBe(3)
  })

  it('displays the prop value by default even if negative', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: -3,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props('modelValue')).toBe(-3)
  })

  it('when the prop value is negative, and add buton clicked goes to 0', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: -3,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(increaseButtonSelector).trigger('click')

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('when the prop value is negative, and add or substract buton clicked goes to 0', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: -3,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(decreaseButtonSelector).trigger('click')

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('adding works', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(increaseButtonSelector).trigger('click')

    expect(wrapper.props('modelValue')).toBe(1)
  })

  it('substracting works', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(decreaseButtonSelector).trigger('click')

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('substracting to 0 does nothing', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(decreaseButtonSelector).trigger('click')

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('value can be set typing', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(inputSelector).setValue('3')

    expect(wrapper.props('modelValue')).toBe(3)
  })

  it('typing invalid numbers returns an aproximation', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        'onUpdate:modelValue': (e: unknown) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.find(inputSelector).setValue('text')
    expect(wrapper.props('modelValue')).toBe(0)

    await wrapper.find(inputSelector).setValue('-3')
    expect(wrapper.props('modelValue')).toBe(0)

    await wrapper.find(inputSelector).setValue('1000')
    expect(wrapper.props('modelValue')).toBe(99)

    await wrapper.find(inputSelector).setValue('1.75')
    expect(wrapper.props('modelValue')).toBe(2)

    await wrapper.find(inputSelector).setValue('1.25')
    expect(wrapper.props('modelValue')).toBe(1)
  })
})
