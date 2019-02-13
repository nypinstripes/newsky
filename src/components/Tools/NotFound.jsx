import React from 'react';
import SvgSymbol from './SvgSymbol';

const NotFound = props => (
  <div aria-errormessage className="not-found page-root" role="region">
    <h1 role="heading">Zoink!</h1>
    <div className="not-found-icon" role="presentation">
      <div className="icon-news">
        <SvgSymbol symbolId="#icon-news-paper-img" />
        <SvgSymbol symbolId="#icon-news-paper" />
        <SvgSymbol symbolId="#icon-news-paper-text" />
      </div>
    </div>
    <p role="note">Didn&apos;t find that one.</p>
  </div>
);

export default NotFound;
