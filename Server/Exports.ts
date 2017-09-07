import * as git from './Git';
import {compile} from './Compiler';
import * as fs from 'fs';
import * as path from 'path';

export async function cache(hash: string) {
	const checkoutDir = path.join('..', 'Projects', 'Checkouts', hash);
	if (!fs.existsSync(checkoutDir)) {
		fs.mkdirSync(checkoutDir);
		git.checkout(path.join('..', 'Projects', 'Repository'), path.join('..', 'Checkouts', hash), hash);
		await compile(checkoutDir, path.join(checkoutDir, 'build'));
	}
}
