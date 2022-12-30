const db = require('../db/index');

exports.createAlbum = async (req, res) => {
        const id = req.params.id;
        const {name, year} = req.body;
    
        if (id) {
            try {
                const { rows: [ album ] } = await db.query('INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', [name, year, id]);
                res.status(201).json(album);
              } catch (err) {
                res.status(500).json(err.message);
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

  exports.updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { name, year } = req.body;
  
    try {
      const { rows: [ Album ] } = await db.query('UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *', [ name, year, id ]);
  
      if (!Album) {
        return res.status(404).json({ message: `Album ${id} does not exist` });
      }
      res.status(200).json(Album);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  };

  exports.updateAlbum2 = async (req, res) => {
    const { id } = req.params;
    const { name, year } = req.body;
    
    let query, params;
    
    if (name && year) {
        query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`;
        params = [name, year, id];
    } else if (name) {
        query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`;
        params = [name, id];
    } else if (year) {
        query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`;
        params = [year, id];
    }
  
    try {
      const { rows: [ Album ] } = await db.query(query, params);
  
      if (!Album) {
        return res.status(404).json({ message: `Album ${id} does not exist` });
      }
      res.status(200).json(Album);
    } catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  };

  exports.deleteAlbums = async (req, res) => {
    try {
      const id = req.params.id;

      const { rows: [ Album ] } = await db.query(`DELETE FROM Albums WHERE id = $1 RETURNING *`, [ id ]);

      if (!Album) {
        return res.status(404).json({ message: `Album ${id} does not exist` });
      } 

      res.status(200).json(Album);
  } catch (err) {
      res.status(500).json(err.message);
  }
}