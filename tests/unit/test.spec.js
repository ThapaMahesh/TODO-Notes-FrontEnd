import { shallowMount } from '@vue/test-utils'
import Notes from '@/components/Notes.vue'

describe('Notes', () => {
  it('is instance of Vue', () => {
    const wrapper = shallowMount(Notes, {

    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
