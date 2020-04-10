const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('common'));
const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { sort, genres = '' } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    let results = apps
        .filter(app => {
            const genres = app.Genres.split(';');
            return genres.find(genre => {
                genre.toLowerCase() === Genres.toLowerCase()
        })

    if (sort === 'Rating') {
        results
            .sort((a, b) => {
                return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
            })
    }
    if (sort === 'App') {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }
    res
        .json(results);
});

module.exports = app;