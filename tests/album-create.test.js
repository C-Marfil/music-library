const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
    describe('/artists/:id/albums', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const { status, body } = await request(app).post('/artists/6/albums').send({
                name: "Ys",
                year: 2003
                })    

                expect(status).to.equal(201)
                expect(body.name).to.equal("Ys")
                expect(body.year).to.equal(2003)

                const { rows: [ albumData ] } = await db.query(
                `SELECT * FROM Albums WHERE id = ${body.id}`
                )
                expect(albumData.name).to.equal('Ys')
                expect(albumData.year).to.equal(2003)
            })
        });
    });
});