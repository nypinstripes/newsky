import { number } from 'prop-types';
import React from 'react';
import Search from '../Search/Search';

const Header = props => (
  <header className="site-header" role="region">
    <Search winW={props.winW} />
  </header>
);

Header.propTypes = {
  winW: number
};

export default Header;
