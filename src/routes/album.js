const express = require('express');
const controllerAlbums = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.post('/:id/albums', controllerAlbums.createAlbum);

albumRouter.get('/', controllerAlbums.getAllAlbums);

albumRouter.get('/:id', controllerAlbums.getAlbumById);

albumRouter.get('/artist/:artistname', controllerAlbums.getAlbumByArtistName);



module.exports = albumRouter;