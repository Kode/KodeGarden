import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

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

export async function compile(socket, from: string, to: string, target: string) {
	from = path.resolve(from);
	to = path.resolve(to);

	let options = {
		from: from,
		to: to,
		projectfile: 'khafile.js',
		target: target,
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

	return new Promise((resolve, reject) => {
		try {
			//fs.mkdirSync(path.join(to));
			//fs.mkdirSync(path.join(to, 'html5'));
			//fs.writeFileSync(path.join(to, 'html5', 'index.html'), indexhtml, 'utf8');

			let promise: Promise<string> = require(path.join(__dirname, '..', '..', 'Kha', 'Tools', 'khamake', 'out', 'main.js'))
			.run(options, {
				info: message => {
					console.log(message);
					if (socket) {
						socket.emit('compilation-message', {message});
					}
				}, error: message => {
					console.log(message);
					if (socket) {
						socket.emit('compilation-error', {message});
					}
				}
			});
			promise.then(resolve);
		}
		catch (error) {
			console.log('Error: ' + error.toString());
			reject();
		}
	});
}
