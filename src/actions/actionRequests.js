import { setRequestOptions } from '../utils';

export const newsSearchReq = async params => {
  const { query, sort } = params;

  if (query.length <= 2) return [];

  let term = encodeURIComponent(query);

  return fetch(`/news?query=${term}&sort=${sort}`, setRequestOptions({}))
    .then(res => res.json())
    .catch(err => console.log(err));
};
