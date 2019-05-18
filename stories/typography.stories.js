import React from 'react'
import { storiesOf } from '@storybook/react'

import { Typography } from '../src'

storiesOf('Typography', module)
  .add('primary', () => {
    return (
      <Typography as='p'>
        test
      </Typography>
    )
  })
