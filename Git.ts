import * as child_process from 'child_process';

export function git(params, cwd = '.', check = true) {
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

function git_clone(url, dir, branch = 'master', depth = 0) {
	if (depth) return git(['clone', url, dir, '--depth', depth]);
	else return git(['clone', url, dir]);
}

function git_exists(url) {
	return git(['ls-remote', '-h', url], '.', false) === 0;
}

function git_checkout(branch, dir) {
	git(['checkout', branch], dir);
}

function git_pull(dir, branch) {
	git(['pull', 'origin', branch], dir);
}
