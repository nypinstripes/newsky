import { create } from 'react-test-renderer';
import App from '../components/App';
import News from '../components/News/News';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const favoritesComponent = create(withRouter(<News />));

  expect(favoritesComponent.toJSON()).toMatchSnapshot();
});
