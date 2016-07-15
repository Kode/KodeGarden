import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

let app = express();
require('express-ws')(app);
let wsapp: any = app;

function compile(connection) {
	let options = {
		from: 'Projects/abc',
		to: path.join('Projects', 'abc', 'build'),
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
		let success = require(path.join(__dirname, '..', 'Kha', 'Tools', 'khamake', 'main.js'))
		.run(options, {
			info: message => {
				console.log(message);
			}, error: message => {
				console.log(message);
			}
		}, function (name) { });

		if (success) {
			connection.send(JSON.stringify({method: 'compiled', data: {}}));
		}
	}
	catch (error) {
		console.log('Error: ' + error.toString());
	}
}

wsapp.ws('/', (connection, request) => {
	connection.on('message', message => {
		let messagedata = JSON.parse(message);
		switch (messagedata.method) {
			case 'compile':
				fs.writeFileSync(path.join('Projects', 'abc', 'Sources', 'Main.hx'), messagedata.data.source, 'utf8');
				compile(connection);
				break;
		}
	});
});

app.use('/', express.static('./Client'));

app.use('/project/', express.static('./Projects/abc/build/html5'));

app.listen(9090);

console.log('The monkeys are listening...');
