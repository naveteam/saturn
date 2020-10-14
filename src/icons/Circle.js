import * as React from 'react'

function SvgCircle(props) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 16 16' {...props}>
      <circle cx='8' cy='8' r='8' />
    </svg>
  )
}

export default SvgCircle
