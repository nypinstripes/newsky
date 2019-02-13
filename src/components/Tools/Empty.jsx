import { object } from 'prop-types';
import React from 'react';
import SvgSymbol from './SvgSymbol';

const Empty = props => (
  <div aria-errormessage className="empty">
    <div className="empty-icon-container" role="presentation">
      <div className="pebble" />
      <div className="pebble" />
      <div className="pebble" />
      <div className="empty-icon">
        <SvgSymbol symbolId={`#${props.emptyType.icon}`} />
      </div>
    </div>
    <div className="empty-msg">
      <h2 role="heading">{props.emptyType.title}</h2>
      <p>{props.emptyType.subTitle}</p>
    </div>
  </div>
);

Empty.propTypes = { emptyType: object };

export default Empty;
