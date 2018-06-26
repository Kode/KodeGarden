import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
const send = require('send');

import {cache} from './Exports';
import {Project} from './Project';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {cookie: false});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('loadProject', async (msg) => {
		const sha = msg.id;
		await cache(socket, sha);
		socket.project = new Project(sha);
		socket.emit('callback', {callid: msg.callid, ret: true});
	});

	socket.on('project', async (msg) => {
		const ret = await socket.project[msg.func](socket, msg);
		socket.emit('callback', {callid: msg.callid, ret: ret});
	});

	socket.on('uploadAsset', async (msg) => {
		if (!Project.checkFilename(msg.filename)) {
			console.log('Save ' + msg.filename + ' at ' + path.join('..', 'Projects', 'Checkouts', msg.sha, 'Assets', msg.filename) + '.');
			let ret = await socket.project.addAsset(socket, msg.sha, msg.filename, msg.buffer);
			socket.emit('callback', {callid: msg.callid, ret: ret});
		}
		else {
			Project.error(socket, 'Bad filename.');
		}
	});
});

app.use('/projects/', async (request, response, next) => {
	let pathname = request.path;
	try {
		if (pathname.endsWith('/')) {
			pathname += 'index.html';
		}
		let parts = pathname.split('/');
		let sha = parts[1];
		let filename = parts[parts.length - 1];
		await cache(null, sha);

		let newparts = ['..', 'Projects', 'Checkouts', sha, 'build'];
		if (filename.endsWith('.essl')) {
			newparts.push('html5worker-resources');
		}
		else {
			newparts.push('html5worker');
		}
		for (let i = 2; i < parts.length; ++i) {
			newparts.push(parts[i]);
		}

		send(request, path.resolve(newparts.join('/'))).pipe(response);
	}
	catch (error) {
		console.log('Illegal path: ' + pathname);
		console.log(error);
		response.status(200).send('Not found.');
	}
});

app.use('/archives/', async (request, response, next) => {
	if (!request.path.endsWith('.zip')) {
		response.status(200).send('Not found.');
	}
	response.setHeader('Content-disposition', 'attachment; filename=' + request.path.substr(1));
	response.setHeader('Content-Type', 'application/zip');
	let filepath = path.resolve(path.join('..', 'Projects', 'Archives', request.path.substr(1)));
	send(request, filepath).pipe(response);
});

async function run(request, response, sha: string) {
	let pathname = request.path;
	try {
		if (pathname.endsWith('/')) {
			pathname += 'index.html';
		}
		let parts = pathname.split('/');
		if (sha === null && parts.length === 2 && !pathname.endsWith('/')) {
			response.redirect('/run' + request.url + '/');
			return;
		}
		let partsIndex = 1;
		if (sha === null) {
			sha = parts[1];
			partsIndex = 2;
		}
		await cache(null, sha, 'html5');

		let newparts = ['..', 'Projects', 'Checkouts', sha, 'build', 'html5'];
		for (let i = partsIndex; i < parts.length; ++i) {
			newparts.push(parts[i]);
		}

		send(request, path.resolve(newparts.join('/'))).pipe(response);
	}
	catch (error) {
		console.log('Illegal path: ' + pathname);
		console.log(error);
		response.status(200).send('Not found.');
	}
}

app.use('/run/', async (request, response, next) => {
	run(request, response, null);
});

let hosts = {
	'robdangero.us': '5e87c51e7ef45cbd11acb8e07bf6f052048f1e2b',
	'www.robdangero.us': '5e87c51e7ef45cbd11acb8e07bf6f052048f1e2b'
};

app.use('/', async (request, response, next) => {
	if (hosts[request.hostname]) {
		run(request, response, hosts[request.hostname]);
	}
	else {
		let pathname = request.path.substr(1);
		if (pathname.endsWith('/') || pathname.length === 0) {
			pathname += 'index.html';
		}
		let filepath = path.resolve(path.join('..', 'Client', 'build', 'html5', pathname));
		send(request, filepath).pipe(response);
	}
});

const port = 9090;

server.listen(port);

console.log('The monkeys are listening on port ' + port + '...');
