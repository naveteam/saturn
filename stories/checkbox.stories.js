import React from 'react'
import { storiesOf } from '@storybook/react'

import { Checkbox } from 'src'

storiesOf('Checkbox', module)
  .add('not selected', () => {
    return (
      <>
        <Checkbox label='Not Selected' />
      </>
    )
  })
  .add('selected', () => {
    return (
      <>
        <Checkbox label='Selected' selected />
      </>
    )
  })
  .add('disabled', () => {
    return (
      <>
        <Checkbox label='Disabled' disabled />
      </>
    )
  })
  .add('disabled selected', () => {
    return (
      <>
        <Checkbox label='Disabled Selected' disabled selected />
      </>
    )
  })
  .add('indeterminated', () => {
    return (
      <>
        <Checkbox label='Indeterminated' indeterminated />
      </>
    )
  })