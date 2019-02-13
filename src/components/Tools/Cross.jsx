import { func, string } from 'prop-types';
import React from 'react';

const Cross = props => (
  <div aria-label={`${props.action.toUpperCase()} ${props.name.toUpperCase()}`}
    className={`${props.name}-clear`}
    data-name={props.name}
    onKeyDown={props.keyDown}
    onMouseUp={props.mouseUp}
    role="button"
    tabIndex="0"
  >
    <div className={`${props.name}-clear-cross`} role="presentation" />
  </div>
);

Cross.propTypes = {
  action: string,
  keyDown: func,
  mouseUp: func,
  name: string
};

export default Cross;
