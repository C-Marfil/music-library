const express = require('express');
const controllerArtist = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', controllerArtist.createArtist);

module.exports = artistRouter;


