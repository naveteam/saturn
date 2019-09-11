import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'src/Theme'

export function renderWithTheme(component) {
  return render(<Provider>{component}</Provider>)
}
