const express = require('express');
const controllerAlbums = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.post('/:id/albums', controllerAlbums.createAlbum);

albumRouter.get('/', controllerAlbums.getAllAlbums);

albumRouter.get('/:id', controllerAlbums.getAlbumById);

albumRouter.get('/artist/:artistname', controllerAlbums.getAlbumByArtistName);

albumRouter.put('/:id', controllerAlbums.updateAlbum);

albumRouter.patch('/:id', controllerAlbums.updateAlbum2);

albumRouter.delete('/:id', controllerAlbums.deleteAlbums);

module.exports = albumRouter;