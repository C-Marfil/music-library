const db = require('../db/index');

exports.createAlbum = async (req, res) => {
        const id = req.params.id;
        const {name, year} = req.body;
    
        if (id) {
            try {
                const { rows: [ album ] } = await db.query('INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', [name, year, id])
                res.status(201).json(album)
              } catch (err) {
                res.status(500).json(err.message)
              }
        }
      };

exports.getAllAlbums = async (_req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM Albums');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  exports.getAlbumById = async (req, res) => {
    const id = req.params.id;

    try {
      const { rows: [ Album ] } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);
      res.status(200).json(Album);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  exports.getAlbumByArtistName = async (req, res) => {
    const artistname = req.params.artistname;

    try {
      const { rows: [ Artist ] } = await db.query('SELECT * FROM Artists WHERE name = $1', [artistname]);
      const { id } = Artist;
      const { rows } = await db.query('SELECT * FROM public.albums WHERE artist_id = $1', [id]);
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };