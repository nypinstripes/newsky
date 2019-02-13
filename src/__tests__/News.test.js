import React from 'react';
import { create } from 'react-test-renderer';
import News from '../components/News';

test('snapshot', () => {
  const newsComponent = create(<News />);

  expect(newsComponent.toJSON()).toMatchSnapshot();
});
