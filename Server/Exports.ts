import * as git from './Git';
import {compile} from './Compiler';
import * as fs from 'fs';
import * as path from 'path';

export async function cache(connection, hash: string) {
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
		await compile(connection, checkoutDir, path.join(checkoutDir, 'build'));
	}
}
