const express = require('express');
const controllerArtist = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', controllerArtist.createArtist);

artistRouter.get('/', controllerArtist.getAllArtists);

artistRouter.get('/:id', controllerArtist.getById);

artistRouter.put('/:id', controllerArtist.updateArtist);

artistRouter.patch('/:id', controllerArtist.updateArtist2);

artistRouter.delete('/:id', controllerArtist.deleteArtist);

module.exports = artistRouter;


