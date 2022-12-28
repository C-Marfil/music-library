const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
    describe('/artists/:id/albums', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const { status, body } = await request(app).post('/artists/2/albums').send({
                name: 'Ys',
                year: 2003,
                })    

                expect(status).to.equal(201)
                expect(body.name).to.equal('Ys')
                expect(body.year).to.equal(2003)

                const { rows: [ artistData ] } = await db.query(
                `SELECT * FROM Artists WHERE id = ${body.id}`
                )
                expect(artistData.name).to.equal('Ys')
                expect(artistData.year).to.equal(2003)
            })
        });
    });
});