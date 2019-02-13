import { newsSearchReq } from './actionRequests';
import {
  SET_BANNER,
  SET_CURRENT_ARTICLE,
  SET_CURRENT_SORT,
  SET_CURRENT_TERM,
  SET_ARTICLES,
  SET_LIST_PAGE,
  SET_SCROLLBAR_OFFSET
} from './actions';

export const setArticles = payload => {
  return async dispatch => await dispatch({ payload, type: SET_ARTICLES });
};

export const setBanner = payload => {
  return async dispatch => await dispatch({ payload, type: SET_BANNER });
};

export const setCurrentArticle = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_CURRENT_ARTICLE });
  };
};

export const setCurrentSort = payload => {
  return async dispatch => await dispatch({ payload, type: SET_CURRENT_SORT });
};

export const setCurrentTerm = payload => {
  return async dispatch => await dispatch({ payload, type: SET_CURRENT_TERM });
};

export const setNewsSearch = params => {
  return async dispatch => {
    try {
      const payload = await newsSearchReq(params);

      setCurrentSort(params.sort);
      setCurrentTerm(params.query);
      return await dispatch({ payload, type: SET_ARTICLES });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setListPage = payload => {
  return async dispatch => await dispatch({ payload, type: SET_LIST_PAGE });
};

export const setScrollBarOffset = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_SCROLLBAR_OFFSET });
  };
};
