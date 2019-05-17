import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from '../src'

storiesOf('Button', module)
  .add('primary', () => {
    return (
      <React.Fragment>
        <Button variant='primary' aditionalStyles='margin-bottom: 20px;' onClick={action('clicked')}>primary</Button>
        <br />
        <Button variant='primary' disabled>DISABLED</Button>
      </React.Fragment>
    )
  })
  .add('secondary', () => <Button variant='secondary' onClick={action('clicked')}>secondary</Button>)
