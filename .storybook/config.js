import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { Provider } from '~/src/Theme'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => <Provider>{story()}</Provider>)

configure(loadStories, module)
