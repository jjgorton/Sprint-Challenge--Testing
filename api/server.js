const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).send(`
        <h1>Games - API</h1>
    `);
});

module.exports = server;
