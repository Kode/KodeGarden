import * as child_process from 'child_process';
import * as path from 'path';
import * as util from 'util';

export async function compile(/*connection,*/ from: string, to: string) {
	from = path.resolve(from);
	to = path.resolve(to);
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
	return new Promise((resolve, reject) => {
		try {
			require(path.join(__dirname, '..', '..', 'Kha', 'Tools', 'khamake', 'out', 'main.js'))
			.run(options, {
				info: message => {
					console.log(message);
					//connection.send(JSON.stringify({method: 'compilation-message', data: {message}}));
				}, error: message => {
					console.log(message);
					//connection.send(JSON.stringify({method: 'compilation-error', data: {message}}));
				}
			}, function (name) {
				
			});
			resolve();
		}
		catch (error) {
			console.log('Error: ' + error.toString());
			reject();
		}
	});
}
