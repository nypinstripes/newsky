import { connect } from 'react-redux';
import { func, object, number, string } from 'prop-types';
import { PowerSelect } from 'react-power-select';
import {
  setArticles,
  setBanner,
  setCurrentSort,
  setCurrentTerm,
  setListPage,
  setNewsSearch
} from '../../actions/actionCreators';

import { withRouter } from 'react-router-dom';
import breakpoints from '../../../shared/data/breakpoints.json';
import Cross from '../Tools/Cross';
import React, { Component } from 'react';

class Search extends Component {
  static propTypes = {
    currentSort: string,
    currentTerm: string,
    history: object,
    scrollOffset: number,
    setArticles: func,
    setBanner: func,
    setCurrentSort: func,
    setCurrentTerm: func,
    setListPage: func,
    setNewsSearch: func,
    winW: number
  }

  state = {
    clearBtnVisible: false,
    currentSearch: '',
    debounceSearchTimeout: null,
    selectedSort: '',
    searchW: {}
  }

  componentDidMount() {
    this.focusSearch();
  }

  componentWillReceiveProps(nextProps) {
    const { scrollOffset, winW } = this.props;
    const { scrollOffset: nextScrollOffset, winW: nextWinW } = nextProps;
    const {
      fullWidth,
      search: {
        inputOffset: { base: offsetSearch }
      },
      viewport: { large }
    } = breakpoints;

    if (scrollOffset !== nextScrollOffset && nextWinW < large) {
      this.setState({
        searchW: {
          width: `calc(${fullWidth}% - ${nextScrollOffset + offsetSearch}px)`
        }
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { scrollOffset, winW } = this.props;
    const { winW: nextWinW } = nextProps;
    const { currentSearch } = this.state;
    const { currentSearch: nextCurrentSearch } = nextState;
    const {
      fullWidth,
      search: {
        inputOffset: { base: offsetSearch }
      },
      viewport: { large }
    } = breakpoints;

    if (winW !== nextWinW) {
      let searchW = {};

      if (scrollOffset > 0 && nextWinW < large) {
        searchW = {
          width: `calc(${fullWidth}% - ${scrollOffset + offsetSearch}px)`
        };
      }
    }

    if (currentSearch !== nextCurrentSearch) {
      this.setState({ clearBtnVisible: nextCurrentSearch.length !== 0 });
    }
  }

  componentWillUnmount() {
    const { debounceSearchTimeout } = this.state;

    if (debounceSearchTimeout) clearTimeout(debounceSearchTimeout);
  }

  clearSearch = e => {
    this.searchInput.value = '';

    this.focusSearch(e);
  }

  focusSearch = e => this.searchInput.focus()

  getClearBtn = () => (
    <Cross action="clear"
      keyDown={this.onResetKeyDown}
      mouseUp={this.clearSearch}
      name="search"
    />
  )

  getSortOptions = () => ['Date', 'Relevance', 'Popularity', 'None']

  onActionKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.searchNews();
  }

  onResetKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      this.clearSearch(e);
    } else if (e.keyCode === 27) {
      e.target.blur();
    }
  }

  onTextInputChange = e => {
    if (this.searchInput.value.length === 0) return;

    this.setState({
      currentSearch: this.searchInput.value,
      debounceSearchTimeout: setTimeout(() => this.searchNews(), 5000)
    });
  }

  onTextKeyInput = e => {
    if (e.keyCode === 13) {
      this.searchNews();
    } else if (e.keyCode === 27) {
      this.searchInput.blur();
    }
  }

  searchNews = () => {
    const {
      currentSort,
      currentTerm,
      history,
      setArticles,
      setBanner,
      setCurrentSort,
      setCurrentTerm,
      setListPage,
      setNewsSearch
    } = this.props;

    const {
      currentSearch: query,
      debounceSearchTimeout,
      selectedSort: sort
    } = this.state;

    let nextSearch = {
      query: '',
      sort: sort.length > 0 ? sort.toLowerCase() : false
    };

    if (query === currentTerm && sort === currentSort) return;

    if (query.length <= 2) {
      setNewsSearch(nextSearch);

      return setBanner({
        message: 'Please use at least 2 letters.',
        status: 'warn'
      });
    }

    setCurrentTerm(query);
    clearTimeout(debounceSearchTimeout);
    this.setState({ debounceSearchTimeout: null });
    nextSearch.query = query;

    setListPage(1);
    setCurrentSort(nextSearch.sort);
    setArticles([]);
    setNewsSearch(nextSearch);
    history.push(`/results?query=${encodeURIComponent(nextSearch.query)}`);
  }

  sortArticles = ({ option }) => this.setState({ selectedSort: option });

  render() {
    const { winW } = this.props;
    const { clearBtnVisible, searchW, selectedSort } = this.state;
    const { large } = breakpoints.viewport;

    return (
      <div className="search" role="region">
        <div className="search-container" style={searchW}>
          <input aria-label="Enter News Search"
            autoComplete="off"
            name="news-search"
            onChange={this.onTextInputChange}
            onKeyDown={this.onTextKeyInput}
            placeholder="Search some term"
            ref={ref => this.searchInput = ref}
            role="search"
            type="text"
          />
          { clearBtnVisible ? this.getClearBtn() : null }
        </div>
        <div className="search-filter" role="listbox">
          <PowerSelect aria-sort
            onChange={this.sortArticles}
            options={this.getSortOptions()}
            placeholder={`Sort ${winW < large ? 'News' : 'Articles'}`}
            searchEnabled={false}
            selected={selectedSort}
          />
        </div>
        <div aria-label="Start Search"
          className="button search-button"
          onMouseUp={this.searchNews}
          onKeyDown={this.onActionKeyDown}
          ref={ref => this.searchButton = ref}
          role="button"
          tabIndex="0"
        >
          <span className="button-text">Search</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentSort: state.currentSort ? state.currentSort : '',
  currentTerm: state.currentTerm ? state.currentTerm : '',
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setArticles(params) {
    dispatch(setArticles(params));
  },
  setBanner(params) {
    dispatch(setBanner(params));
  },
  setCurrentSort(params) {
    dispatch(setCurrentSort(params));
  },
  setCurrentTerm(params) {
    dispatch(setCurrentTerm(params));
  },
  setListPage(params) {
    dispatch(setListPage(params));
  },
  setNewsSearch(params) {
    params.dispatch = dispatch;

    dispatch(setNewsSearch(params));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
