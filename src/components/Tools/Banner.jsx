import { connect } from 'react-redux';
import { object } from 'prop-types';
import React from 'react';

const Banner = props => (
  <div className={
      `banner ${props.banner.status ? props.banner.status : 'conceal'}`
    }
    role="banner"
  >
    <div className="banner-container">
      <h4>{props.banner.message}</h4>
    </div>
  </div>
);

Banner.propTypes = {
  banner: object
};

const mapStateToProps = (state, ownProps) => ({
  banner: state.banner ? state.banner : {}
});

export default connect(mapStateToProps)(Banner);
