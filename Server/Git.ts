import * as child_process from 'child_process';

function git(params: string[], cwd = '.', workTree = '.', check = true): number {
	let env = Object.create(process.env);
	env.GIT_WORK_TREE = workTree;
	//params.push('--work-tree');
	//params.push(workTree);
	const proc = child_process.spawnSync('git', params, {encoding: 'utf8', cwd: cwd, /*env: env,*/ stdio: 'pipe'});
	const status = proc.status;
	if (status !== 0 && check) {
		let param = '';
		for (let p of params) {
			param += p + ' ';
		}
		console.log(proc.output);
		console.log('git ' + param + 'in ' + cwd +  ' exited with status ' + status + '.');
	}
	return status;
}

export function clone(url: string, dir: string, branch = 'master', depth = 0): number {
	if (depth > 0) return git(['clone', url, dir, '--depth', depth.toString()]);
	else return git(['clone', url, dir]);
}

export function exists(url: string): boolean {
	return git(['ls-remote', '-h', url], '.', '.', false) === 0;
}

export function checkout(dir: string, workTree: string, revision = 'master'): void {
	git(['--work-tree=' + workTree, 'checkout', '-f', revision], dir, workTree);
}

export function pull(dir: string, branch = 'master'): void {
	git(['pull', 'origin', branch], dir);
}
