import React from 'react';
import SvgSymbol from './SvgSymbol';

const Loader = props => (
  <div className="loader" role="presentation">
    <div className="loader-top">
      <span>
        <span />
      </span>
      <span>
        <span />
      </span>
    </div>
    <div className="loader-center">
      <div className="loader-center-left">
        <div className="loader-center-left-bg" />
      </div>
      <div className="loader-center-right">
        <span>
          <span />
        </span>
        <span />
        <span />
        <span>
          <span />
          <span />
        </span>
        <span />
      </div>
    </div>
    <div className="loader-bottom">
      <span>
        <span />
        <span />
      </span>
      <span>
        <span />
      </span>
      <span>
        <span />
      </span>
    </div>
  </div>
);

export default Loader;

