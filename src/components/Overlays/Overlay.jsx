import { camelizeString } from '../../utils';
import { connect } from 'react-redux';
import { bool, func, number, object, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import Cross from '../Tools/Cross';
import ArticleOverlay from './ArticleOverlay';
import DefaultOverlay from './DefaultOverlay';
import React, { Component } from 'react';

const components = {
  article: ArticleOverlay,
  default: DefaultOverlay
};

class Overlay extends Component {
  static propTypes = {
    disposeOverlay: func,
    overlayActive: bool,
    overlayData: object,
    overlayLocked: bool,
    overlayName: string,
    scrollOffset: number,
    toggleOverlay: func,
    winW: number
  }

  state = {
    currentOverlayName: ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentOverlayName: nextProps.overlayName });
  }

  getOverlay = name => {
    const {
      disposeOverlay,
      overlayActive,
      overlayData,
      toggleOverlay,
      winW
    } = this.props;

    const NamedOverlay = components[camelizeString(name)];

    if (overlayActive === true) {
      return <NamedOverlay disposeOverlay={disposeOverlay}
        overlayData={overlayData}
        toggleOverlay={toggleOverlay}
        winW={winW}
      />;
    }
  }

  getOverlayClass = name => {
    const { overlayActive, overlayLocked } = this.props;
    let visibile = overlayActive === true ? 'revealed' : 'concealed';
    let lock = overlayLocked === true ? ' overlay-locked' : '';

    return `overlay${name !== '' ? ` ${name}-overlay ${visibile}${lock}` : ''}`;
  }

  getOverlayStyle = () => {
    const { scrollOffset } = this.props;

    return scrollOffset > 0 ? { right: `${scrollOffset}px` } : {};
  }

  getOverlayContainer = () => {
    const { currentOverlayName } = this.state;
    let overlayClass = `${currentOverlayName}-overlay-container`;

    return (
      <div className={`overlay-container ${overlayClass}`}>
        {this.getOverlay(currentOverlayName)}
      </div>
    );
  }

  shouldOverlayDispose = e => {
    const { disposeOverlay, overlayLocked } = this.props;

    return overlayLocked ? e.stopPropagation() : disposeOverlay(e);
  }

  render() {
    const { disposeOverlay, scrollOffset } = this.props;
    const { currentOverlayName } = this.state;

    return (
      <div aria-modal
        className={`${this.getOverlayClass(currentOverlayName)}`}
        onClick={this.shouldOverlayDispose}
        style={this.getOverlayStyle()}
      >
        <Cross action="close"
          keyDown={disposeOverlay}
          mouseUp={disposeOverlay}
          name="overlay"
        />
        { this.getOverlayContainer() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

export default withRouter(connect(mapStateToProps)(Overlay));
