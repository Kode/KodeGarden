import * as git from './Git';
import {compile} from './Compiler';
import * as fs from 'fs';
import * as path from 'path';

const html = '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Kode Project</title>'
	+ '<style>html, body, canvas, div { margin:0; padding: 0; width:100%; height:100%; } #khanvas { display:block; border:none; outline:none; }</style>'
	+ '</head>'
	+ '<body><canvas id="khanvas" width="0" height="0"></canvas><script src="kha.js"></script></body>'
	+ '</html>';

let inProgress = {};

let lastHash: string = null;

export async function cache(socket: SocketIO.Socket, hash: string, target: string = 'html5worker') {
	let hashtarget = hash + target;
	if (inProgress[hashtarget] !== undefined) {
		return new Promise<void>((resolve, reject) => {
			inProgress[hashtarget].push(() => {
				resolve();
			});
		});
	}

	inProgress[hashtarget] = [];

	const checkoutDir = path.join('..', 'Projects', 'Checkouts', hash);
	if (!fs.existsSync(checkoutDir)) {
		fs.mkdirSync(checkoutDir);
		git.checkout(path.join('..', 'Projects', 'Repository'), path.join('..', 'Checkouts', hash), hash);
		let shadersDir = path.join(checkoutDir, 'Shaders');
		if (!fs.existsSync(shadersDir)) {
			fs.mkdirSync(shadersDir);
		}
		let assetsDir = path.join(checkoutDir, 'Assets');
		if (!fs.existsSync(assetsDir)) {
			fs.mkdirSync(assetsDir);
		}
	}
	if (!fs.existsSync(path.join(checkoutDir, 'build', target))) {
		let errored = false;
		try {
			await compile(socket, checkoutDir, path.join(checkoutDir, 'build'), target);
		}
		catch (err) {
			if (socket) {
				socket.emit('compilation-message', {message: 'Compilation failed.'});
			}
			errored = true;
		}
		if (!errored && target === 'html5') {
			fs.writeFileSync(path.join(checkoutDir, 'build', target, 'index.html'), html, {encoding: 'utf8'});
		}
	}
	else {
		if (socket) {
			if (lastHash !== hash) {
				socket.emit('compilation-message', {message: 'Project found in cache, skipping compilation.'});
				lastHash = hash;
			}
		}
	}

	for (let callback of inProgress[hashtarget]) {
		callback();
	}
	delete inProgress[hashtarget];
}
