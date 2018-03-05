import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
const send = require('send');
const sha256 = require('js-sha256').sha256;
const vhost = require('vhost');

import {cache} from './Exports';
import {Project} from './Project';

let app = express();
require('express-ws')(app);
let wsapp: any = app;

wsapp.ws('/', (connection, request) => {
	connection.on('message', async message => {
		if (typeof message === 'string') {
			let messagedata = JSON.parse(message);
			if (messagedata.func === 'loadProject') {
				const sha = messagedata.id;
				await cache(connection, sha);
				connection.project = new Project(sha);
				connection.send(JSON.stringify({callid: messagedata.callid, ret: true}));
			}
			else {
				let ret = await connection.project[messagedata.func](connection, messagedata);
				connection.send(JSON.stringify({callid: messagedata.callid, ret: ret}));
			}
		}
		else {
			function stringFromBuffer(buffer: Buffer, offset: number, length: number): string {
				let codes = [];
				for (let i = offset; i < offset + length; i += 2) {
					codes.push(buffer.readUInt16LE(i));
				}
				return String.fromCodePoint.apply(null, codes);
			}

			let buffer: Buffer = message;
			if (buffer.byteLength < 1024 * 1024 * 10) {
				let callid = buffer.readUInt32LE(0);
				let headLength = buffer.readUInt32LE(4);
				let headString = stringFromBuffer(buffer, 8, headLength);
				let parts = headString.split('/');
				let sha = parts[0];
				let filename = parts[1];
				if (Project.checkFilename(filename)) {
					console.log('Save ' + filename + ' at ' + path.join('..', 'Projects', 'Checkouts', sha, 'Assets', filename) + '.');
					let ret = await connection.project.addAsset(connection, sha, filename, buffer, headLength + 8);
					connection.send(JSON.stringify({callid: callid, ret: ret}));
				}
				else {
					Project.error(connection, 'Bad filename.');
				}
			}
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

app.listen(port);

console.log('The monkeys are listening on port ' + port + '...');
