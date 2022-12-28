const express = require('express');
const controllerAlbums = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.post('/:id/albums', controllerAlbums.createAlbum);

module.exports = albumRouter;