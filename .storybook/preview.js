import React, { Fragment } from 'react'
import { addDecorator } from '@storybook/react'
import { Helmet } from 'react-helmet'

addDecorator(storyFn => (
  <Fragment>
    <Helmet>
      <link
        href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
        rel='stylesheet'
      />
    </Helmet>
    <div style={{ overflow: 'auto', padding: 20, backgroundColor: 'rgb(249, 249, 249)' }}>{storyFn()}</div>
  </Fragment>
))
