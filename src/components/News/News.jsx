import { connect } from 'react-redux';
import { array, func, number, string } from 'prop-types';
import {
  setArticles,
  setCurrentTerm,
  setNewsSearch
} from '../../actions/actionCreators';

import Article from './Article';
import List from '../Lists/List';
import queryString from 'query-string';
import React, { Component } from 'react';

class News extends Component {
  static propTypes = {
    articles: array,
    currentSort: string,
    currentTerm: string,
    setCurrentTerm: func,
    setNewsSearch: func,
    setArticles: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    currentSearch: '',
    emptyType: {
      icon: 'icon-earth',
      subTitle: "Sorry! We didn't find any results.",
      title: '0 results found'
    },
    goToSearch: null,
    listSort: ''
  }

  componentWillMount() {
    const { currentSort, setCurrentTerm, setNewsSearch } = this.props;
    const { currentSearch } = this.state;
    const { search } = location;

    if (search && search.indexOf('query') !== -1) {
      let queryParams = queryString.parse(search);

      this.setState({ currentSearch: queryParams.query });
      setCurrentTerm(queryParams.query);
      setNewsSearch({
        query: queryParams.query,
        sort: currentSort
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      currentTerm: nextCurrentTerm,
      currentSort: nextCurrentSort
    } = nextProps;

    const { currentTerm, currentSort } = this.props;

    if (nextCurrentTerm && currentTerm !== nextCurrentTerm) {
      this.setState({ currentSearch: nextCurrentTerm });
    }

    if (nextCurrentSort && currentSort !== nextCurrentSort) {
      this.setState({ listSort: nextCurrentSort });
    }
  }

  componentWillUnmount() {
    this.props.setArticles([]);
  }

  render() {
    const { articles, currentSort, toggleOverlay, winW } = this.props;
    const { currentSearch, emptyType, goToSearch, listSort } = this.state;

    return (
      <div className="news page-root" role="region">
        <List currentSearch={currentSearch}
          currentSort={listSort}
          emptyType={emptyType}
          listItems={articles}
          ListItem={Article}
          toggleOverlay={toggleOverlay}
          winW={winW}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  articles: state.articles ? state.articles : [],
  currentSort: state.currentSort ? state.currentSort : '',
  currentTerm: state.currentTerm ? state.currentTerm : ''
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setArticles(params) {
    dispatch(setArticles(params));
  },
  setCurrentTerm(params) {
    dispatch(setCurrentTerm(params));
  },
  setNewsSearch(params) {
    dispatch(setNewsSearch(params));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(News);
