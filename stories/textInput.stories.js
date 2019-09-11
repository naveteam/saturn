import React from 'react'
import { storiesOf } from '@storybook/react'

import { Input } from '../src'

storiesOf('Text Input', module)
  .add('normal', () => {
    return (
      <>
        <Input
          label='Label'
          placeholder='Placeholder'
          caption='Caption'
          multiline
        />
      </>
    )
  })