const agents = require('../../shared/data/browsers');
const express = require('express');
const helpers = require('../utils/index');
const isBrowserSupported = helpers.isBrowserSupported;
const router = express.Router();
const shapes = require('../../shared/data/svg');
const typeface = require('../../shared/data/fonts');
const UAParser = require('ua-parser-js');

router.get('/', (req, res, next) => {
  const { headers: { 'user-agent': agent }} = req;
  let parser = UAParser(agent);
  let view = 'index';
  typeface.fonts.forEach(font => {
    let src = [
      `local('${font.local}')`,
      `local('${font.local.replace(' ', '-')}')`,
      `url(${font.url}) format('${font.format}')`
    ];

    font.src = src.join(', ');
  });

  let locals = { shapes, typeface };

  if (!isBrowserSupported(parser)) {
    locals.browsers = agents.browsers.filter(browser => browser.fallback);
    locals.unsupported = true;
    view = 'unsupported';
  }

  res.render(view, locals);
});

module.exports = router;
