export const camelizeString = str => {
  return str.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
    .replace(/[\s|_|-]/g, '')
    .replace(/^(.)/, $1 => $1.toLowerCase());
};

export const getBasicReducer = params => {
  const { action: { type, payload }, name, state } = params;

  return type === name ? payload : state;
};

export const inflectTerm = params => {
  const { count, term } = params;

  return count === 1 ? term.substring(0, term.length - 1) : term;
};

export const setRequestOptions = params => {
  const { accept, content, data, method } = params;
  let options = {
    method: method ? method : 'GET',
    headers: {
      'Content-Type': content ? content : 'application/json',
      'Accept': accept ? accept : 'application/json'
    },
    resolveWithFullResponse: true
  };

  if ('PATCH POST PUT'.indexOf(method) !== -1) {
    options.body = JSON.stringify(data);
  }

  return options;
};


export const uniqGenerator = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
