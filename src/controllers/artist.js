const db = require('../db/index');

exports.createArtist = async (req, res) => {
    const { name, genre } = req.body
  
    try {
      const { rows: [ artist ] } = await db.query('INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *', [name, genre]);
      res.status(201).json(artist);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  exports.getAllArtists = async (_req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM Artists');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
