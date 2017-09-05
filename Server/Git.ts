import * as child_process from 'child_process';

function git(params: string[], cwd = '.', check = true): number {
	const status = child_process.spawnSync('git', params, {encoding: 'utf8', cwd: cwd}).status;
	if (status !== 0 && check) {
		let param = '';
		for (let p of params) {
			param += p + ' ';
		}
		console.log('git ' + param + 'exited with status ' + status + '.');
	}
	return status;
}

export function clone(url: string, dir: string, branch = 'master', depth = 0): number {
	if (depth > 0) return git(['clone', url, dir, '--depth', depth.toString()]);
	else return git(['clone', url, dir]);
}

export function exists(url: string): boolean {
	return git(['ls-remote', '-h', url], '.', false) === 0;
}

export function checkout(dir: string, branch = 'master'): void {
	git(['checkout', branch], dir);
}

export function pull(dir: string, branch = 'master'): void {
	git(['pull', 'origin', branch], dir);
}
