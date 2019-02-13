import { connect } from 'react-redux';
import { func, number, object } from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { setBanner, setScrollBarOffset } from '../actions/actionCreators';
import Banner from './Tools/Banner';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import keydown from 'react-keydown';
import Landing from './Landing';
import Legal from './Docs/Legal';
import News from './News/News';
import NotFound from './Tools/NotFound';
import Overlay from './Overlays/Overlay';
import Privacy from './Docs/Privacy';
import React, { Component } from 'react';
import ScrollTopButton from './Tools/ScrollTopButton';
import Terms from './Docs/Terms';

class App extends Component {
  static propTypes = {
    banner: object,
    scrollOffset: number,
    setBanner: func,
    setScrollBarOffset: func
  }

  state = {
    bannerActive: false,
    bannerTimeout: null,
    overlayActive: false,
    overlayData: {},
    overlayLocked: false,
    overlayName: 'default',
    winW: 0
  }

  componentWillMount() {
    this.setWindowWidth();
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWindowWidth);
    document.addEventListener('DOMContentLoaded', this.setScrollOffset);
  }

  componentWillReceiveProps(nextProps) {
    const { banner } = this.props;
    const { banner: nextBanner } = nextProps;

    if (Object.keys(banner).length < Object.keys(nextBanner).length) {
      this.setState({
        bannerActive: true,
        bannerTimeout: setTimeout(() => this.deactivateBanner(), 3000)
      });
    } else if (Object.keys(banner).length > Object.keys(nextBanner).length) {
      this.setState({
        bannerActive: false,
        bannerTimeout: null
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.bannerTimeout);
    window.removeEventListener('resize', this.setWindowWidth);
    document.removeEventListener('DOMContentLoaded', this.setScrollOffset);
  }

  activateOverlay = () => {
    const {
      overlayActive,
      overlayData,
      overlayLocked,
      overlayName,
      winW
    } = this.state;

    if (overlayActive) {
      return <Overlay disposeOverlay={this.disposeOverlay}
        overlayActive={overlayActive}
        overlayData={overlayData}
        overlayLocked={overlayLocked}
        overlayName={overlayName}
        toggleOverlay={this.toggleOverlay}
        winW={winW}
      />;
    }

    return <Overlay disposeOverlay={this.disposeOverlay}
      overlayActive={false}
      overlayName="default"
      winW={winW}
    />;
  }

  deactivateBanner = () => {
    this.setState({
      bannerActive: false,
      bannerTimeout: null
    });

    this.props.setBanner({});
    clearTimeout(this.state.bannerTimeout);
  }

  @keydown('esc')
  disposeOverlayKey(e) { this.disposeOverlay(e); }

  disposeOverlay = e => {
    if (e) e.stopPropagation();

    this.setState({ overlayActive: false });
    document.body.classList.remove('no-scroll');
  }

  getAppModes = () => {
    const { overlayActive } = this.state;
    let activeOverlay = overlayActive ? ' overlay-active' : '';
    let offsetScroll = this.getScrollOffset();
    let pageName = this.getPageName();

    return `app ${pageName}${activeOverlay}${offsetScroll}`;
  }

  getPageName = () => {
    let path = location.pathname;

    if (path === '/') return 'all';

    path = path.substring(1);

    if (path.indexOf('/') === -1) {
      return path;
    } else {
      let extension = '';

      return `${path.substring(0, path.indexOf('/'))}${extension}`;
    }
  }

  getScrollOffset = () => this.props.scrollOffset > 0 ? ' offset-scroll' : '';

  setScrollOffset = () => {
    const offset = document.body.getAttribute('data-offset');

    if (offset) {
      this.props.setScrollBarOffset(parseInt(offset));
      document.removeEventListener('DOMContentLoaded', this.setScrollOffset);
    }
  }

  setWindowWidth = () => this.setState({ winW: window.innerWidth })

  toggleOverlay = options => {
    this.setState({
      overlayActive: true,
      overlayData: options.data,
      overlayLocked: options.locked || false,
      overlayName: options.name
    });

    document.body.classList.add('no-scroll');
  }

  render() {
    const { bannerActive, winW } = this.state;

    return (
      <div className={this.getAppModes()}
        ref={ref => this.appEl = ref}
        role="application"
      >
        { this.activateOverlay() }
        <Header winW={winW} />
        { bannerActive ? <Banner /> : null }
        <ScrollTopButton />
        <div className="app-body" role="region">
          <Switch>
            <Route exact
              path="/"
              render={props => <Landing winW={winW} {...props} />}
            />
            <Route path="/legal" render={props => <Legal {...props} />} />
            <Route path="/articles"
              render={props => <News
                toggleOverlay={this.toggleOverlay}
                winW={winW}
                {...props}
              />}
            />
            <Route path="/privacy" render={props => <Privacy {...props} />} />
            <Route path="/results"
              render={props => <News
                toggleOverlay={this.toggleOverlay}
                winW={winW}
                {...props}
              />}
            />
            <Route path="/terms" render={props => <Terms {...props} />} />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </div>
        <Footer page={this.getPageName()} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  banner: state.banner ? state.banner : {},
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setScrollBarOffset(params) {
    dispatch(setScrollBarOffset(params));
  },
  setBanner(params) {
    dispatch(setBanner(params));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
