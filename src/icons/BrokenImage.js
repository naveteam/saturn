import * as React from 'react'

function SvgBrokenImage(props) {
  return (
    <svg viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      <path d='M22 4.222v7.322L19.456 8.99a1.12 1.12 0 00-1.578 0l-3.656 3.667L10.567 9A1.107 1.107 0 009 9l-3.667 3.656L2 9.31V4.222C2 3 3 2 4.222 2h15.556C21 2 22 3 22 4.222zm-3.333 7.134L22 14.7v5.078C22 21 21 22 19.778 22H4.222C3 22 2 21 2 19.778v-7.311l2.544 2.544a1.107 1.107 0 001.567 0l3.667-3.667L13.433 15A1.107 1.107 0 0015 15l3.667-3.644z' />
    </svg>
  )
}

export default SvgBrokenImage
