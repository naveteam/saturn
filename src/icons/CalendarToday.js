import * as React from 'react'

function SvgCalendarToday(props) {
  return (
    <svg viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      <path d='M19.364 3.818h-.91V2.91c0-.5-.409-.909-.909-.909s-.909.41-.909.91v.908h-9.09V2.91c0-.5-.41-.909-.91-.909s-.909.41-.909.91v.908h-.909c-1 0-1.818.818-1.818 1.818v14.546c0 1 .818 1.818 1.818 1.818h14.546c1 0 1.818-.818 1.818-1.818V5.636c0-1-.818-1.818-1.818-1.818zm-.91 16.364H5.727c-.5 0-.909-.41-.909-.91V8.365h14.546v10.909c0 .5-.41.909-.91.909z' />
    </svg>
  )
}

export default SvgCalendarToday
