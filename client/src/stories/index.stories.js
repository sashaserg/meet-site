/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import Header from '../components/Header.vue'
import FilterBar from '../components/FilterBar.vue'
import TextInput from '../components/TextInput.vue'

storiesOf('Button', module)
  .add('with text', () => ({
    components: { TextInput },
    template: '<TextInput></TextInput>',
  }))
  .add('header', () => ({
    components: { Header },
    template: '<Header></Header>'
  }))
  .add('filterBar', () => ({
    components: { FilterBar },
    template: '<FilterBar></FilterBar>'
  }))
