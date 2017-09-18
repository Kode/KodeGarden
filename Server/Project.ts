import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as git from './Git';
import {cache} from './Exports';

export class Project {
	id: string;

	constructor(id: string) {
		this.id = id;
	}
	
	async sources(): Promise<string[]> {
		return fs.readdirSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Sources'));
	}

	async source(connection, args: any): Promise<string> {
		return fs.readFileSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Sources', args.file), {encoding: 'utf8'});
	}

	async setSource(connection, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), args.content, {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Sources/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		await cache(connection, sha);
		return sha;
	}

	async addSource(connection, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), 'package;\n', {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Sources/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		await cache(connection, sha);
		return sha;
	}

	async shaders(): Promise<string[]> {
		return fs.readdirSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Shaders'));
	}

	async shader(connection, args: any): Promise<string> {
		return fs.readFileSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Shaders', args.file), {encoding: 'utf8'});
	}

	async setShader(connection, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), args.content, {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Shaders/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		await cache(connection, sha);
		return sha;
	}

	async addShader(connection, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), 'void main() {\n\n}\n', {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Shaders/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		await cache(connection, sha);
		return sha;
	}

	async assets(): Promise<string[]> {
		return fs.readdirSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Assets'));
	}

	async addAsset(connection, id: string, filename: string, buffer: Buffer): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), buffer);
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Assets/' + filename);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		await cache(connection, sha);
		return sha;
	}

	async download(connection, args: any): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			let id = args.id;
			if (fs.existsSync(path.join('..', 'Projects', 'Archives', id + '.zip'))) {
				resolve(id);
				return;
			}
			const dir = path.join('..', 'Projects', 'Repository');
			git.tagRevision(dir, id);
			git.cloneLocal(path.join('..', 'Repository'), id, path.join('..', 'Projects', 'Archives'));

			let sevenZip = process.platform == 'win32' ? 'C:\\Program Files\\7-Zip\\7z.exe' : '7za';
			let proc = child_process.execFile(sevenZip, ['a', path.join('..', 'Projects', 'Archives', id + '.zip'), path.join('..', 'Projects', 'Archives', id)]);
			proc.addListener('close', (code, signal) => {
				resolve(id);
			});
		});
	}
}
