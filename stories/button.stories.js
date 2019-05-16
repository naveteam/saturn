import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '../src'

storiesOf('Welcome', module).add('to Storybook', () => <h1>Design System</h1>);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>teste</Button>)
  // .add('with some emoji', () => (
  //   <Button onClick={action('clicked')}>
  //     <span role="img" aria-label="so cool">
  //       😀 😎 👍 💯
  //     </span>
  //   </Button>
  // ));
