import * as React from 'react'

function SvgAvatarPerson(props) {
  return (
    <svg viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.5625 20.4074C22.6887 18.2422 24 15.2743 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 15.2743 1.31135 18.2422 3.4375 20.4074C4.87202 18.3069 9.48497 17.25 12 17.25C14.515 17.25 19.128 18.3069 20.5625 20.4074ZM16.5 10.5C16.5 12.9862 14.4862 15 12 15C9.51375 15 7.5 12.9862 7.5 10.5C7.5 8.01375 9.51375 6 12 6C14.4862 6 16.5 8.01375 16.5 10.5Z'
      />
    </svg>
  )
}

export default SvgAvatarPerson
