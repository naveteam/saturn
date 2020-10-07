import * as React from 'react'

function SvgBusyCircle(props) {
  return (
    <svg viewBox='0 0 16 16' width='1em' height='1em' {...props}>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55229 5.44772 9 6 9H10C10.5523 9 11 8.55229 11 8C11 7.44772 10.5523 7 10 7H6Z'
      />
    </svg>
  )
}

export default SvgBusyCircle
