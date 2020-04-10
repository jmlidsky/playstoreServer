const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Rating', 'Genres'
                );
            });
    });

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of rating or app');
    });

    it('should sort by app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                    // compare app at `i` with next app at `i + 1`
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    // if the next app is less than the app at i,
                    if (appAtIPlus1.App < appAtI.App) {
                        // the apps were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });

    it.only('should filter by genre', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let filtered = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                    // compare app at `i` with next app at `i + 1`
                    const appAtI = res.body[i];
                    console.log(appAtI);
                    if (appAtI.Genres !== 'Action') {
                        filtered = false;
                        break;
                    }
                    i++;
                }
                expect(filtered).to.be.true;
            });
    });
});