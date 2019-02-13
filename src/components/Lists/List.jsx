import { connect } from 'react-redux';
import { array, func, number, object, string } from 'prop-types';
import { setListPage } from '../../actions/actionCreators';
import { withRouter } from 'react-router-dom';
import breakpoints from '../../../shared/data/breakpoints.json';
import Empty from '../Tools/Empty';
import ListHead from './ListHead';
import React, { Component } from 'react';
import SvgSymbol from '../Tools/SvgSymbol';

class List extends Component {
  static propTypes = {
    currentTerm: string,
    emptyType: object,
    ListItem: func,
    listItems: array,
    listPage: number,
    setListPage: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    gridW: 0,
    itemsPerPage: 10,
    maxGridW: 'auto',
    pagingVisible: 'concealed',
    scrollAnchor: null
  }

  componentWillMount() {
    this.setScrollAnchor();
  }

  componentDidMount() {
    this.updateGridWidth();
  }

  componentWillReceiveProps(nextProps) {
    const { listItems: nextListItems, listPage: nextListPage } = nextProps;
    const { listItems, listPage } = this.props;

    if (listPage !== nextListPage) this.updateGridWidth(nextListItems);
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      currentTerm: nextCurrentTerm,
      listItems: nextListItems,
      listPage: nextListPage,
      winW: nextWinW
    } = nextProps;

    const { currentTerm, listItems, listPage, winW } = this.props;

    if (winW !== nextWinW
      || listItems.length !== nextListItems.length
      || currentTerm !== nextCurrentTerm
      || listPage !== nextListPage) {

      this.updateGridWidth(nextListItems);
    }
  }

  concealPagingControl = () => this.setState({ pagingVisible: 'concealed' })

  getMorePagesToShow = pagingData => {
    const { currentPage, totalPages } = pagingData;

    if (currentPage >= totalPages - 1) return '';

    return (
      <div className="page-number-extension">
        <div className="page-number-extended" role="presentation">
          <span>...</span>
        </div>
        <div className="page-number-extended" role="log">
          <span>{totalPages}</span>
        </div>
      </div>
    );
  }

  getPageNumber = params => {
    const { page, data: { currentPage }} = params;

    return (
      <div className="page-number"
        data-number={page}
        key={page}
        onClick={e => this.goToPage(e, { currentPage, page })}
        role="button"
        tabIndex="0"
      >
        <span>{page}</span>
      </div>
    );
  }

  getPagingBtn = (btnType, pagingData) => {
    const { currentPage, isLastPage, totalPages } = pagingData;
    let btnNumber;
    let isFirstOrLast = btnType === 'first' || btnType === 'last';

    switch(btnType) {
      case 'first': btnNumber = 1; break;
      case 'last': btnNumber = totalPages; break;
      case 'next': btnNumber = currentPage + 1; break;
      case 'prev': btnNumber = currentPage - 1; break;
      default: btnNumber = 1;
    }

    return (
      <div className="page-number-btn"
        data-btn={btnType}
        data-number={btnNumber}
        onClick={e => this.goToPage(e, { currentPage, page: btnNumber })}
        role="button"
        title={`${btnType} page`}
        tabIndex="0"
      >
        { this.getPagingBtnIcon() }
        { isFirstOrLast ? this.getPagingBtnIcon() : '' }
      </div>
    );
  }

  getPagingBtnIcon = () => (
    <div className="page-number-btn-icon">
      <SvgSymbol symbolId="#icon-caret" />
    </div>
  )

  getPagingControl = (currentPage, pageNumbers) => {
    const { pagingVisible } = this.state;
    let firstPage, secondPage, thirdPage;
    let totalPages = pageNumbers.length;
    let isLastPage = currentPage === totalPages;
    let data = { currentPage, isLastPage, totalPages };

    if (totalPages === 1) {
      return '';
    } else if (totalPages === 2) {
      firstPage = 1;
      secondPage = 2;
      thirdPage = null;
    } else if (currentPage === 1 && totalPages > 2) {
      firstPage = 1;
      secondPage = 2;
      thirdPage = 3;
    } else if (isLastPage && totalPages > 2) {
      firstPage = totalPages - 2;
      secondPage = totalPages - 1;
      thirdPage = totalPages;
    } else {
      firstPage = currentPage - 1;
      secondPage = currentPage;
      thirdPage = currentPage + 1;
    }

    return (
      <div aria-label="List Pages"
        className={`page-numbers ${pagingVisible}`}
        data-page={currentPage}
        data-last={isLastPage ? 'true' : 'false'}
        role="navigation"
      >
        { totalPages > 3 ? this.getPagingBtn('first', data) : '' }
        { this.getPagingBtn('prev', data) }
        <div className="page-number-container" role="navigation">
          { this.getPageNumber({ page: firstPage, data }) }
          { this.getPageNumber({ page: secondPage, data }) }
          { thirdPage ? this.getPageNumber({ page: thirdPage, data }) : '' }
          { totalPages > 3 ? this.getMorePagesToShow(data) : '' }
        </div>
        { this.getPagingBtn('next', data) }
        { totalPages > 3 ? this.getPagingBtn('last', data) : '' }
      </div>
    );
  }

  goToPage = (e, params) => {
    const { setListPage } = this.props;
    const { currentPage, page } = params;

    if (currentPage !== page) {
      this.concealPagingControl();
      setListPage(parseInt(e.currentTarget.getAttribute('data-number')));
    }

    this.scrollToTop();
  }

  revealPagingControl = () => this.setState({ pagingVisible: 'revealed' })

  scrollToTop = e => {
    this.state.scrollAnchor.scroll({ behavior: 'smooth', left: 0, top: 0 });
  }

  updateGridWidth = (nextListItems = []) => {
    const { listItems, listPage, winW } = this.props;
    const { itemsPerPage } = this.state;
    const {
      item: {
        spacing: itemSpacing,
        width: itemW
      },
      size: { full },
      viewport: {
        small: minGrid,
        medium: mediumGrid,
        large: largeGrid,
        xLarge: xLargeGrid
      }
    } = breakpoints;

    let listLength = listItems.length;
    let gridW = `${full}%`;
    let articleW = itemW;
    let minItemCount;
    let spacing = 0;

    if (winW < largeGrid) return this.setState({ gridW, maxGridW: 'auto' });

    let totalW = this.refs.listEl ? this.refs.listEl.clientWidth : winW;
    spacing = itemSpacing;
    articleW += spacing;

    if (nextListItems.length > 0) listLength = nextListItems.length;

    minItemCount = Math.floor(totalW / articleW);
    gridW = `${listLength <= 1 ? articleW : minItemCount * articleW}px`;

    this.setState({ gridW });
  }

  setScrollAnchor = () => {
    this.setState({ scrollAnchor: document.getElementById('app-container') });
  }

  render() {
    const {
      currentTerm,
      emptyType,
      ListItem,
      listItems,
      listPage,
      toggleOverlay,
      winW
    } = this.props;

    const { gridW, itemsPerPage, maxGridW } = this.state;
    let totalItems = listItems.length;

    if (totalItems === 0) return <Empty emptyType={emptyType} />;

    let hasPages = totalItems > itemsPerPage;
    let lastItem = listPage * itemsPerPage;
    let firstItem = lastItem - itemsPerPage;
    let currentItems = listItems.slice(firstItem, lastItem);
    let pageNumbers = [];
    let wellWidth = {
      maxWidth: maxGridW,
      width: gridW
    };

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div aria-live="polite"
        className="list"
        ref="listEl"
        role="region"
      >
        <ListHead count={totalItems} />
        <div className="list-grid" role="list" style={wellWidth}>
          { currentItems.map((item, i) => (
            <ListItem item={item}
              itemIndex={i}
              key={`list-item-${i}`}
              pageLength={i === itemsPerPage - 1 ? itemsPerPage : i + 1}
              revealPagingControl={this.revealPagingControl}
              toggleOverlay={toggleOverlay}
              winW={winW}
            />
          ))}
        </div>
        { hasPages ? this.getPagingControl(listPage, pageNumbers) : null }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentTerm: state.currentTerm ? state.currentTerm : '',
  listPage: state.listPage ? state.listPage : 1
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setListPage(params) { dispatch(setListPage(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
