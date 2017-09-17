import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
const send = require('send');
const sha256 = require('js-sha256').sha256;

import {cache} from './Exports';
import {Project} from './Project';

let app = express();
require('express-ws')(app);
let wsapp: any = app;

function compile(connection, from, to) {
	let options = {
		from: from,
		to: to,
		projectfile: 'khafile.js',
		target: 'html5',
		vr: 'none',
		pch: false,
		intermediate: '',
		graphics: 'direct3d11',
		visualstudio: 'vs2017',
		kha: '',
		haxe: '',
		ogg: '',
		aac: '',
		mp3: '',
		h264: '',
		webm: '',
		wmv: '',
		theora: '',
		kfx: '',
		krafix: '',
		ffmpeg: '',
		nokrafix: false,
		embedflashassets: false,
		compile: false,
		run: false,
		init: false,
		name: 'Project',
		server: false,
		port: 8080,
		debug: false,
		silent: false
	};
	try {
		return require(path.join(__dirname, '..', 'Kha', 'Tools', 'khamake', 'main.js'))
		.run(options, {
			info: message => {
				console.log(message);
				connection.send(JSON.stringify({method: 'compilation-message', data: {message}}));
			}, error: message => {
				console.log(message);
				connection.send(JSON.stringify({method: 'compilation-error', data: {message}}));
			}
		}, function (name) { });
	}
	catch (error) {
		console.log('Error: ' + error.toString());
		return false;
	}
}

let khafile = [ 
	'var project = new Project(\'KodeGarden\');',
	'project.addAssets(\'Assets/**\');',
	'project.addSources(\'Sources\');',
	'return project;'
].join('\n');

let indexhtml = [
	'<!DOCTYPE html>',
	'<html>',
	'<head>',
	'<meta charset="utf-8"/>',
	'<title>Kode Garden Project</title>',
	'<style>',
	'html, body, canvas, div {',
	'margin: 0;',
	'padding: 0;',
	'width: 100%;',
	'height: 100%;',
	'}',
	'#khanvas {',
	'display: block;',
	'border: none;',
	'outline: none;',
	'}',
	'</style>',
	'</head>',
	'<body>',
	'<canvas id="khanvas"></canvas>',
	'<script src="kha.js"></script>',
	'</body>',
	'</html>'
].join('\n');

wsapp.ws('/', (connection, request) => {
	connection.on('message', async message => {
		if (typeof message === 'string') {
			let messagedata = JSON.parse(message);
			const sha = messagedata.id;
			await cache(connection, sha);
			let project = new Project(sha);
			let ret = await project[messagedata.func](connection, messagedata);
			connection.send(JSON.stringify({callid: messagedata.callid, ret: ret}));
			/*switch (messagedata.method) {
				case 'compile':
					let sha = sha256(messagedata.data.source);
					let dir = path.join('Projects', sha);
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir);
						fs.writeFileSync(path.join(dir, 'khafile.js'), khafile, 'utf8');

						fs.mkdirSync(path.join(dir, 'build'));
						fs.mkdirSync(path.join(dir, 'build', 'html5'));
						fs.writeFileSync(path.join(dir, 'build', 'html5', 'index.html'), indexhtml, 'utf8');

						fs.mkdirSync(path.join(dir, 'Sources'));
						fs.writeFileSync(path.join(dir, 'Sources', 'Main.hx'), messagedata.data.source, 'utf8');
						if (compile(connection, dir, path.join(dir, 'build'))) {
							connection.send(JSON.stringify({method: 'compiled', data: {sha: sha}}));
						}
						else {
							connection.send(JSON.stringify({method: 'errored', data: {}}));
						}
					}
					else {
						if (fs.existsSync(path.join(dir, 'build', 'html5', 'kha.js'))) {
							connection.send(JSON.stringify({method: 'compiled', data: {sha: sha}}));
						}
						else {
							connection.send(JSON.stringify({method: 'errored', data: {}}));
						}
					}
					break;
				case 'getSource':
					fs.readFile(path.join('Projects', messagedata.data.sha, 'Sources', 'Main.hx'), 'utf8', (err, data) => {
						if (!err) connection.send(JSON.stringify({method: 'source', data: {source: data}}));
					});
					break;
			}*/
		}
		else {
			function stringFromArrayBuffer(buffer: Uint16Array): string {
				return String.fromCharCode.apply(null, buffer);
			}

			let buffer: Buffer = message;
			if (buffer.byteLength < 1024 * 1024 * 10) {
				let start = new Uint32Array(buffer.buffer, 0, 2);
				let callid = start[0];
				let headLength = start[1];
				let head = new Uint16Array(buffer.buffer, 8, headLength / 2);
				let headString = stringFromArrayBuffer(head);
				let parts = headString.split('/');
				let sha = parts[0];
				let filename = parts[1];
				console.log('Save ' + filename + ' at ' + path.join('..', 'Projects', 'Checkouts', sha, 'Assets', filename) + '.');
				
				await cache(connection, sha);
				let project = new Project(sha);
				let ret = await project.addAsset(connection, sha, filename, Buffer.from(buffer.buffer, headLength + 8));
				connection.send(JSON.stringify({callid: callid, ret: ret}));
			}
		}
	});
});

app.use('/projects/', async (request, response, next) => {
	let pathname = url.parse(request.url).pathname;
	try {
		if (pathname.endsWith('/')) {
			pathname += 'index.html';
		}
		let parts = pathname.split('/');
		let sha = parts[1];
		await cache(null, sha);

		let newparts = ['..', 'Projects', 'Checkouts', sha, 'build', 'html5worker'];
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

app.use('/', express.static('../Client'));

const port = 9090;

app.listen(port);

console.log('The monkeys are listening on port ' + port + '...');
