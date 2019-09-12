import React from 'react'
import { storiesOf } from '@storybook/react'

import { Input } from 'src'

storiesOf('Input', module)
  .add('normal', () => {
    return (
      <>
        <Input
          label='Label'
          placeholder='Placeholder'
          leftIcon={
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V14C16 11.34 10.67 10 8 10Z'
                fill='#7F7F7F'
              />
            </svg>
          }
          rightIcon={
            <svg width='22' height='15' viewBox='0 0 22 15' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z'
                fill='#7F7F7F'
              />
            </svg>
          }
          caption='Caption'
        />
      </>
    )
  })
  .add('error', () => {
    return (
      <>
        <Input
          label='Label'
          placeholder='Placeholder'
          error='error message'
          rightIcon={
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C13.91 14.69 13.28 14.69 12.89 14.3L10 11.41L7.11 14.3C6.72 14.69 6.09 14.69 5.7 14.3C5.31 13.91 5.31 13.28 5.7 12.89L8.59 10L5.7 7.11C5.31 6.72 5.31 6.09 5.7 5.7C6.09 5.31 6.72 5.31 7.11 5.7L10 8.59L12.89 5.7C13.28 5.31 13.91 5.31 14.3 5.7C14.69 6.09 14.69 6.72 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z'
                fill='#E53B3B'
              />
            </svg>
          }
          caption='Caption'
        />
      </>
    )
  })
  .add('verified', () => {
    return (
      <>
        <Input
          label='Label'
          verified
          placeholder='Placeholder'
          rightIcon={
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM7.29 14.29L3.7 10.7C3.31 10.31 3.31 9.68 3.7 9.29C4.09 8.9 4.72 8.9 5.11 9.29L8 12.17L14.88 5.29C15.27 4.9 15.9 4.9 16.29 5.29C16.68 5.68 16.68 6.31 16.29 6.7L8.7 14.29C8.32 14.68 7.68 14.68 7.29 14.29Z'
                fill='#17AE29'
              />
            </svg>
          }
          caption='Caption'
        />
      </>
    )
  })
  .add('disabled', () => {
    return (
      <>
        <Input
          label='Label'
          disabled
          leftIcon={
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V14C16 11.34 10.67 10 8 10Z'
                fill='#7F7F7F'
              />
            </svg>
          }
          rightIcon={
            <svg width='22' height='15' viewBox='0 0 22 15' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z'
                fill='#7F7F7F'
              />
            </svg>
          }
          caption='Caption'
        />
      </>
    )
  })
