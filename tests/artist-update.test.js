const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Update Artist', () => {
  let artist
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
      'Tame Impala',
      'rock',
    ])

    artist = rows[0]
  })

  describe('PUT /artists/{id}', () => {
    it('replaces the artist and returns the updated record', async () => {
      const { status, body } = await request(app).put(`/artists/${artist.id}`).send({ name: 'something different', genre: 'different genre' })

      expect(status).to.equal(200)

      expect(body).to.deep.equal({ id: artist.id, name: 'something different', genre: 'different genre' })
    })
    it('returns error if artist does not exist', async () => {
        const { status, body } = await request(app).put(`/artists/99999`).send({ name: 'something different', genre: 'different genre' })

        expect(status).to.equal(404);

        expect(body).to.deep.equal({ "message": 'artist 99999 does not exist' });
    })
  })

  describe('PATCH /artists/{id}', () => {
    it('updates the artist and returns the updated record', async () => {
      const { status, body } = await request(app).patch(`/artists/${artist.id}`).send({ name: 'something different', genre: 'rock' })

      expect(status).to.equal(200)

      expect(body).to.deep.equal({ id: artist.id, name: 'something different', genre: 'rock' })
    })

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).patch('/artists/999999999').send({ name: 'something different', genre: 'rock' })

      expect(status).to.equal(404)
      expect(body.message).to.equal('artist 999999999 does not exist')
    })
  })
});