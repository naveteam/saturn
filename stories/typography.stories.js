import React from 'react'
import { storiesOf } from '@storybook/react'

import { Typography } from '../src'

storiesOf('Typography', module)
  .add('normal', () => {
    return (
      <Typography as='p'>
        test
      </Typography>
    )
  })
