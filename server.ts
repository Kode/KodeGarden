import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
const send = require('send');
const sha256 = require('js-sha256').sha256;

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
		graphics: 'direct3d9',
		visualstudio: 'vs2015',
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
			}, error: message => {
				console.log(message);
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
	connection.on('message', message => {
		let messagedata = JSON.parse(message);
		switch (messagedata.method) {
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
					connection.send(JSON.stringify({method: 'compiled', data: {sha: sha}}));
				}
				break;
			case 'getSource':
				fs.readFile(path.join('Projects', messagedata.data.sha, 'Sources', 'Main.hx'), 'utf8', (err, data) => {
					if (!err) connection.send(JSON.stringify({method: 'source', data: {source: data}}));
				});
				break;
		}
	});
});

app.use('/projects/', (request, response, next) => {
	let pathname = url.parse(request.url).pathname;
	try {
		let parts = pathname.split('/');
		let sha = parts[1];
		let newparts = ['Projects', sha, 'build', 'html5'];
		for (let i = 2; i < parts.length; ++i) {
			newparts.push(parts[i]);
		}
		send(request, newparts.join('/')).pipe(response);
	}
	catch (error) {
		console.log('Illegal path: ' + pathname);
	}
});

app.use('/', express.static('./Client'));

app.listen(9090);

console.log('The monkeys are listening...');
