const express = require('express');
const controllerArtist = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', controllerArtist.createArtist);

artistRouter.get('/', controllerArtist.getAllArtists);

module.exports = artistRouter;


