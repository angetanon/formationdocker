'use strict';
	const express = require('express');
	const os = require('os')
	const mongoose = require('mongoose');
	const bodyParser = require('body-parser')
	
// Constants
	const PORT = 8080;
	const HOST = '0.0.0.0';
	const MONGO_HOST = process.env.MONGO_HOST ? process.env.MONGO_HOST : '192.168.99.100';
	console.log('MONGO_HOST', MONGO_HOST );
	
// Express
	const app = express();
	app.use(express.json())
	app.use(express.urlencoded())
	
// Connect MongoDB
	const MONGO_URL = `mongodb://${MONGO_HOST}/test`;
	mongoose.connect(MONGO_URL);

// MongoDB Formations schema
	const Formation = mongoose.model('Formation', { name: String });
		app.get('/formations', (req, res) => {
		Formation.find()
				 .limit(10)
				 .exec((err, formations) =>{
					if (err) {
						res.json({error: err}).status(400);
							}
		res.json(formations).status(200);
					})
				});
				
			app.post('/formations', (req, res) => {
		const formationToAdd = new Formation(req.body);
		formationToAdd.save()
			.then(
				(data) => {
			console.log(data)
			res.send().status(200);
						  },
			(err) => {
		res.send({error: err}).status(400);
					}
				);
			});
	app.listen(PORT, HOST);
	console.log(`Running on http://${HOST}:${PORT}`);