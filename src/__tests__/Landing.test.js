import { create } from 'react-test-renderer';
import App from '../components/App';
import Landing from '../components/Landing';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const landingComponent = create(withRouter(<Landing />));

  expect(landingComponent.toJSON()).toMatchSnapshot();
});
