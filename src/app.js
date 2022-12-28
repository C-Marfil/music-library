const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
app.use("/artists", albumRouter);
app.use("/albums", albumRouter);

module.exports = app;
