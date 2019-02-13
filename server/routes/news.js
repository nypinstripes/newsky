const envVars = require('../../shared/data/api');
const express = require('express');
const fetch = require('node-fetch');
const helpers = require('../utils/index');
const outlets = require('../../shared/data/sources');
const setRequestOptions = helpers.setRequestOptions;
const router = express.Router();

router.get('/', async (req, res, next) => {
  const { query, sort } = req.query;
  const { dev: { news: { API_KEY, API_URL }}} = envVars;
  let articles = [];
  let pageSize = 100;
  let url = `${API_URL}?q=${query}&apiKey=${API_KEY}&pageSize=${pageSize}`;

  if (sort && sort !== 'undefined') {
    url += `&sortBy=${sort === 'date' ? 'publishedAt' : sort}`;
  }

  articles = await fetch(url, setRequestOptions({}))
    .then(results => results.json())
    .then(results => {
      return results.articles.map(article => {
        outlets.sources.forEach(source => {
          if (article.source.name === source.name) {
            article.source.icon = source.icon;
          }
        });

        if (!article.source.icon) article.source.icon = '';

        return article;
      });
    }).catch(err => console.log(err));

  console.log(articles);

  res.status(200).json(articles);
});

module.exports = router;
