import * as child_process from 'child_process';

function git(params: string[], cwd = '.', check = true) {
	const proc = child_process.spawnSync('git', params, {encoding: 'utf8', cwd: cwd, stdio: 'pipe'});
	const status = proc.status;
	if (status !== 0 && check) {
		let param = '';
		for (let p of params) {
			param += p + ' ';
		}
		console.log(proc.output);
		console.log('git ' + param + 'in ' + cwd +  ' exited with status ' + status + '.');
	}
	return proc;
}

export function clone(url: string, dir: string, branch = 'master', depth = 0): number {
	if (depth > 0) return git(['clone', url, dir, '--depth', depth.toString()]).status;
	else return git(['clone', url, dir]).status;
}

export function exists(url: string): boolean {
	return git(['ls-remote', '-h', url], '.', false).status === 0;
}

export function checkout(dir: string, workTree: string, revision = 'master'): void {
	git(['--work-tree=' + workTree, 'checkout', '-f', revision], dir);
}

export function pull(dir: string, branch = 'master'): void {
	git(['pull', 'origin', branch], dir);
}

export function readTreeEmpty(dir: string): void {
	git(['read-tree', '--empty'], dir);
}

export function readTree(dir: string, parenthash): void {
	git(['read-tree', parenthash], dir);
}

export function hashObject(dir: string, filepath: string): string {
	return git(['hash-object', '-w', filepath], dir).output[1].trim();
}

export function addToIndex(dir: string, objecthash: string, repofilepath: string): void {
	git(['update-index', '--add', '--cacheinfo', '100644', objecthash, repofilepath], dir);
}

export function writeTree(dir: string): string {
	return git(['write-tree'], dir).output[1].trim();
}

export function commitTree(dir: string, treehash: string, parenthash: string): string {
	return git(['commit-tree', treehash, '-p', parenthash, '-m', 'Kode Garden commit'], dir).output[1].trim();
}

export function tagRevision(dir: string, hash: string): void {
	git(['tag', '-m', 'Tag for ' + hash, 'tag' + hash, hash], dir);
}

export function cloneLocal(dir: string, hash: string, targetDir: string): void {
	git(['clone', dir, hash, '-b', 'tag' + hash], targetDir);
}