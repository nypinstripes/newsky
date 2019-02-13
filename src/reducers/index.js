import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils';
import {
  SET_BANNER,
  SET_CURRENT_ARTICLE,
  SET_CURRENT_SORT,
  SET_CURRENT_TERM,
  SET_ARTICLES,
  SET_LIST_PAGE,
  SET_SCROLLBAR_OFFSET
} from '../actions/actions';

const articles = (state = [], action) => {
  return getBasicReducer({ action, name: SET_ARTICLES, state });
};

const banner = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_BANNER, state });
};

const currentArticle = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_CURRENT_ARTICLE, state });
};

const currentSort = (state = '', action) => {
  return getBasicReducer({ action, name: SET_CURRENT_SORT, state });
};

const currentTerm = (state = '', action) => {
  return getBasicReducer({ action, name: SET_CURRENT_TERM, state });
};

const listPage = (state = 1, action) => {
  return getBasicReducer({ action, name: SET_LIST_PAGE, state });
};

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const rootReducer = combineReducers({
  articles,
  banner,
  currentArticle,
  currentTerm,
  currentSort,
  listPage,
  scrollOffset
});

export default rootReducer;
