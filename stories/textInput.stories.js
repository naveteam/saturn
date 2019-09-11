import React from 'react'
import { storiesOf } from '@storybook/react'

import { Input } from '../src'

storiesOf('Input Text Area', module)
  .add('normal', () => {
    return (
      <>
        <Input
          label='Label'
          placeholder='Text here'
          caption='Caption'
          multiline
        />
      </>
    )
  })
  .add('disabled', () => {
    return (
      <>
        <Input
          label='Label'
          placeholder='Text here'
          caption='Caption'
          multiline
          disabled
        />
      </>
    )
  })