import { mount } from '@vue/test-utils'
import Folio from '@/components/Folio.vue';

describe('Folio', () => {
    const wrapper = mount(Folio)
    
    test('Match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})