const express = require('express');

const db = require('../data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).send(`
        <h1>Games - API</h1>
    `);
});

server.get('/games', (req, res) => {
	db('games')
		.then((games) => {
			res.status(200).json(games);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

server.post('/games', (req, res) => {
	if (!req.body.title || !req.body.genre) {
		res.status(422).json({ message: "Please provide the game's title and genre." });
	} else {
		db('games')
			.insert(req.body, 'id')
			.then((ids) => {
				db('games').where({ id: ids[0] }).first().then((game) => {
					res.status(201).json(game);
				});
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}
});

module.exports = server;
