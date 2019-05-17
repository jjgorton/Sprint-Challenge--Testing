const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

describe('server', () => {
	beforeEach(async () => {
		await db('games').truncate();
	});

	describe('POST(/games)', () => {
		it('returns status 201', () => {
			return request(server)
				.post('/games')
				.send({
					title       : 'Pacman',
					genre       : 'Arcade',
					releaseYear : 1980
				})
				.then((res) => {
					expect(res.status).toEqual(201);
				});
		});

		it('returns status 422', () => {
			return request(server)
				.post('/games')
				.send({
					genre       : 'Arcade',
					releaseYear : 1980
				})
				.then((res) => {
					expect(res.status).toEqual(422);
				});
		});

		// it('header content', () => {

		// })
	});

	describe('GET(/games)', () => {
		it('return status 200', (done) => {
			request(server).get('/games').then((res) => {
				expect(res.status).toEqual(200);
				done();
			});
		});

		it('returns an array', () => {
			return request(server).get('/games').then((res) => {
				expect(res.body).toHaveLength(0);
			});
		});

		// it('header content', () => {

		// })
	});
});
