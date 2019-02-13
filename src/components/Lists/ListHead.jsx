import { number } from 'prop-types';
import ListInfo from './ListInfo';
import React from 'react';

const ListHead = props => (
  <div className="list-head" role="region">
    <ListInfo count={props.count} />
  </div>
);

ListHead.propTypes = {
  count: number
};

export default ListHead;
