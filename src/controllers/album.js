const db = require('../db/index');

exports.createAlbum = async (req, res) => {
        const id = req.params.id;
        const {name, year, artist_id} = req.body;
    
    
        if (id) {
            try {
                const { rows: [ album ] } = await db.query('INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', [name, year, id])
                res.status(201).json(album)
              } catch (err) {
                res.status(500).json(err.message)
              }
        }
      }