import { withRouter } from 'react-router-dom';
import React from 'react';
import Loader from './Tools/Loader';

const Landing = props => (
  <div className="landing page-root" role="region">
    <section className="periodical">
      <Loader />
    </section>
    <section className="periodical-text">
      <h1 role="heading">
        <span>Ignite</span> Your Daily News Search
      </h1>
      <h2 role="heading">(with news from over 30k sources &amp; blogs!)</h2>
    </section>
  </div>
);

export default withRouter(Landing);
