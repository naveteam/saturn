import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from 'src'

storiesOf('Button', module)
  .add('primary', () => {
    return (
      <React.Fragment>
        <Button variant='primary' mb='20px'>
          primary
        </Button>
        <br />
        <Button variant='primary' disabled>
          DISABLED
        </Button>
      </React.Fragment>
    )
  })
  .add('secondary', () => {
    return (
      <React.Fragment>
        <Button variant='secondary' mb='20px'>
          secondary
        </Button>
        <br />
        <Button variant='secondary' disabled>
          disabled
        </Button>
      </React.Fragment>
    )
  })
  .add('ghost', () => {
    return (
      <React.Fragment>
        <Button variant='ghost' mb='20px;'>
          ghost
        </Button>
        <br />
        <Button variant='ghost' disabled>
          disabled
        </Button>
      </React.Fragment>
    )
  })
