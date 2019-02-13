const agents = require('../../shared/data/browsers');

exports.getItemArrayIndex = params => {
  return params.items.findIndex(item => item.id === params.id);
};

exports.isBrowserSupported = parser => {
  const { browser: { name }, ua } = parser;
  let browsers = agents.browsers.map(browser => browser.agents.join(' '));
  let user = name ? name.toLowerCase() : false;
  let social = agents.social.map(network => {
     let socialAgent = network.agents.filter(agent => ua.indexOf(agent) !== -1);

     return socialAgent.length > 0 ? socialAgent.join(' ') : '';
  });

  let support = true;
  social = social.join('');

  if (user && social.length === 0 && browsers.join(' ').indexOf(user) === -1) {
    support = false;
  }

  return support;
};

exports.setRequestOptions = params => {
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

exports.uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
