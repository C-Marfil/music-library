const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ 'string': 'Hello World' });
});

module.exports = app;
