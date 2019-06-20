const express = require('express');
const WatchListService = require('./watchlist-service');
const requireAuth = require('../middleware/jwt-auth');

const watchListRouter = express.Router();
const jsonBodyParser = express.json();

watchListRouter.all(requireAuth).post('/', jsonBodyParser, (req, res, next) => {
  const { title, image_url, user_id } = req.body;

  const newEntry = {
    user_id,
    title,
    image_url
  };

  console.log('new entry received', newEntry);

  WatchListService.insertShow(req.app.get('db'), newEntry)
    .then(show => {
      console.log('show response', show);
      return res.status(201).json(WatchListService.serializeShow(show));
    })
    .catch(next);
});

module.exports = watchListRouter;