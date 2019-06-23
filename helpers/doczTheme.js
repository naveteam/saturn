
import React from 'react'

import { Provider } from '../src/Theme'

export default ({children}) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
