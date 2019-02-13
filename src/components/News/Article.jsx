import { connect } from 'react-redux';
import { func, number, object, string } from 'prop-types';
import { setCurrentArticle } from '../../actions/actionCreators';
import breakpoints from '../../../shared/data/breakpoints.json';
import hdate from 'human-date';
import sources from '../../../shared/data/sources.json';
import React, { Component } from 'react';
import SvgSymbol from '../Tools/SvgSymbol';

class Article extends Component {
  static propTypes = {
    currentArticle: object,
    currentSort: string,
    item: object,
    itemIndex: number,
    pageLength: number,
    revealPagingControl: func,
    setCurrentArticle: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    ellipsisMode: false,
    isExpanding: '',
    isExpandingTimeout: '',
    itemActive: false
  }

  componentWillMount() {
    const { itemIndex } = this.props;
    const { item: { reveal }} = breakpoints;
    let loadOffset = itemIndex * reveal;

    this.setState({
      isExpandingTimeout: setTimeout(() => this.expandItem(), reveal)
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      item: nextItem,
      currentArticle: nextCurrentArticle
    } = nextProps;

    const { item, setCurrentArticle } = this.props;

    if (nextCurrentArticle.id === nextItem.id && nextItem.id !== item.id) {
      setCurrentArticle({ item: nextItem });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { revealPagingControl } = this.props;
    const { itemIndex, pageLength } = nextProps;
    const { isExpanding } = this.state;
    const { item: { descriptionHeight }} = breakpoints;

    if (isExpanding !== nextState.isExpanding
      && this.descriptionEl.clientHeight > descriptionHeight) {

      this.setState({ ellipsisMode: true });
    }

    if (itemIndex === pageLength - 1) revealPagingControl();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isExpanding, isExpandingTimeout } = this.state;

    if (isExpanding !== prevState.isExpanding) {
      clearTimeout(isExpandingTimeout);
    }
  }

  componentWillUnmount() {
    const { isExpandingTimeout } = this.state;

    clearTimeout(isExpandingTimeout);
  }

  expandItem = () => {
    const { itemIndex, pageLength, revealPagingControl } = this.props;

    this.setState({ isExpanding: 'expanded' });

    if (itemIndex === pageLength - 1) revealPagingControl();
  }

  getPostedDate = () => (
    <div className="article-published">
      { hdate.prettyPrint(this.props.item.publishedAt, { showTime: true }) }
    </div>
  )

  getSourceIcon = () => {
    const { item: { source: { icon, name }, url }} = this.props;

    return (
      <a className="article-source"
        href={url}
        onMouseUp={e => e.stopPropagation(e)}
        rel="noopener noreferrer"
        role="link"
        style={{ backgroundImage: `url(${icon})` }}
        tabIndex="0"
        target="_blank"
        title={name}
      />
    );
  }

  launchOverlay = async e => {
    const { item, setCurrentArticle, toggleOverlay } = this.props;

    e.stopPropagation();
    await setCurrentArticle({ item });
    await toggleOverlay({
      data: {},
      name: 'article'
    });
  }

  onActionKeyDown = e => {
    const { keys: { enter, space }} = breakpoints;

    if (e.keyCode === space || e.keyCode === enter) this.onItemAction(e);

    return;
  }

  onItemAction = e => this.launchOverlay(e)

  toggleActive = e => {
    const { itemActive } = this.state;

    e.stopPropagation();
    this.setState({ itemActive: !itemActive });
  }

  render() {
    const {
      currentSort,
      item: {
        description,
        source: { icon },
        title,
        url,
        urlToImage: image
      },
      itemIndex,
      winW
    } = this.props;

    const { ellipsisMode, isExpanding, itemActive } = this.state;

    return (
      <div className={`article article-${itemIndex} list-item ${isExpanding}`}
        onClick={this.onItemAction}
        onFocus={e => this.setState({ itemActive: true })}
        onKeyDown={this.onActionKeyDown}
        onMouseEnter={this.toggleActive}
        onMouseLeave={this.toggleActive}
        ref={ref => this.listItem = ref}
        role="listitem article"
        tabIndex="0"
      >
        <div className="list-item-container">
          { icon !== '' ? this.getSourceIcon() : null }
          <div className="list-item-img">
            <div className="list-item-img-bg"
              role="Img"
              style={{ backgroundImage: `url(${image})`}}
            />
          </div>
        </div>
        <div className="list-item-details">
          <div aria-details className="list-item-info">
            <a className="article-title"
              href={url}
              onMouseUp={e => e.stopPropagation(e)}
              rel="noopener noreferrer"
              role="heading link"
              tabIndex="0"
              target="_blank"
              title={title}
            >
              {title}
            </a>
            <p className={`${ellipsisMode ? 'has-ellipsis' : ''}`}
              title={description}
            >
              <span className="article-description"
                ref={ref => this.descriptionEl = ref}
              >
                {description}
              </span>
            </p>
          </div>
          <div className="button-row">
            <a className="button"
              href={url}
              onMouseUp={e => e.stopPropagation(e)}
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
              target="_blank"
            >
              <span className="button-text">Read More</span>
            </a>
            { currentSort === 'date' ? this.getPostedDate() : null }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentArticle: state.currentArticle ? state.currentArticle : {},
  currentSort: state.currentSort ? state.currentSort : ''
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentArticle(params) {
    dispatch(setCurrentArticle(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
