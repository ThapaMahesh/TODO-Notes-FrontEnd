import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Notes from '@/components/Notes.vue'
import Vuetify from 'vuetify'
import notesApi from '@/services/services.js'

const mockNotes = [
  {
      "id": 1,
      "title": "delectus aut autem",
      "content": "Lorem ipsum",
      "status": "New"
  },
  {
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "content": "Lorem ipsum",
      "status": "Completed"
  },
  {
      "id": 3,
      "title": "fugiat veniam minus",
      "content": "Lorem ipsum",
      "status": "Not completed"
  }
]

jest.spyOn(notesApi, 'get').mockResolvedValue(mockNotes)

describe('Notes', () => {
  let vuetify
  let localVue
  let wrapper
  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()

    wrapper = shallowMount(Notes, {
      localVue: localVue,
      vuetify: vuetify,
      computed: {
        getTotal: () => mockNotes.length,
        getCompleted: () => mockNotes.filter(x=>x.status=="Complete").length,
        getNotCompleted: () => mockNotes.filter(x=>x.status=="Not complete").length,
        getNew: () => mockNotes.filter(x=>x.status=="New").length
      }
    })
  })

  it('is instance of Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(notesApi.get).toHaveBeenCalledTimes(1)
    expect(notesApi.get).toHaveBeenCalledWith('/notes')
  })

})
