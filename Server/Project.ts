import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as git from './Git';
import { cache } from './Exports';

export class Project {
	id: string;

	constructor(id: string) {
		this.id = id;
	}

	static filesInDir(allFiles: string[], base: string, dir: string): void {
		let files = fs.readdirSync(dir);
		for (let file of files) {
			let filepath = path.join(dir, file);
			if (fs.statSync(filepath).isDirectory()) {
				this.filesInDir(allFiles, base, filepath);
			}
			else {
				allFiles.push(path.relative(base, filepath).replace(/\\/g, '/'));
			}
		}
	}
	
	async sources(): Promise<string[]> {
		let base = path.join('..', 'Projects', 'Checkouts', this.id, 'Sources');
		let allFiles: string[] = [];
		Project.filesInDir(allFiles, base, base);
		return allFiles;
	}

	async source(socket, args: any): Promise<string> {
		return fs.readFileSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Sources', args.file), {encoding: 'utf8'});
	}

	static checkMacros(s :string): boolean {
		if (/@([^:]*):([\/*a-zA-Z\s]*)(macro|build|autoBuild|file|audio|bitmap|font)/.test(s)) return true;
		if (/macro/.test(s)) return true;
		return false;
	}

	async compile(socket, args: any): Promise<boolean> {
		try {
			await cache(socket, args.id);
			return true;
		}
		catch (error) {
			return false;
		}
	}

	async setSource(socket, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;

		if (Project.checkMacros(args.content)) {
			Project.error(socket, 'Found a macro.');
			return parenthash;
		}

		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), args.content, {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Sources/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		//await cache(connection, sha);
		return sha;
	}

	static checkFilename(filename: string): boolean {
		return filename.indexOf('\\') >= 0
			|| filename.indexOf('?') >= 0
			|| filename.indexOf('%') >= 0
			|| filename.indexOf('*') >= 0
			|| filename.indexOf(':') >= 0
			|| filename.indexOf('|') >= 0
			|| filename.indexOf('"') >= 0
			|| filename.indexOf('<') >= 0
			|| filename.indexOf('>') >= 0
			|| filename.length < 1
			|| filename.length > 256
			|| filename[0] === '.';
	}

	static error(socket, message: string) {
		console.log(message);
		if (socket) {
			socket.emit('compilation-error', {message: message});
		}
	}

	async addSource(socket, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;

		if (Project.checkFilename(args.file)) {
			Project.error(socket, 'Bad filename.');
			return parenthash;
		}

		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), 'package;\n', {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Sources/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		//await cache(socket, sha);
		return sha;
	}

	async shaders(): Promise<string[]> {
		let base = path.join('..', 'Projects', 'Checkouts', this.id, 'Shaders');
		let allFiles: string[] = [];
		Project.filesInDir(allFiles, base, base);
		return allFiles;
	}

	async shader(socket, args: any): Promise<string> {
		return fs.readFileSync(path.join('..', 'Projects', 'Checkouts', this.id, 'Shaders', args.file), {encoding: 'utf8'});
	}

	async setShader(socket, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;
		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), args.content, {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Shaders/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		//await cache(socket, sha);
		return sha;
	}

	async addShader(socket, args: any): Promise<string> {
		const dir = path.join('..', 'Projects', 'Repository');
		const parenthash = args.id;

		if (Project.checkFilename(args.file)) {
			Project.error(socket, 'Bad filename.');
			return parenthash;
		}

		git.readTreeEmpty(dir);
		git.readTree(dir, parenthash);
		fs.writeFileSync(path.join('..', 'Projects', 'Temp', 'whatever'), 'void main() {\n\n}\n', {encoding: 'utf8'});
		const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
		git.addToIndex(dir, objecthash, 'Shaders/' + args.file);
		const treehash = git.writeTree(dir);
		const sha = git.commitTree(dir, treehash, parenthash);
		//await cache(socket, sha);
		return sha;
	}

	async assets(): Promise<string[]> {
		let base = path.join('..', 'Projects', 'Checkouts', this.id, 'Assets');
		let allFiles: string[] = [];
		Project.filesInDir(allFiles, base, base);
		return allFiles;
	}

	async addAsset(socket, id: string, filename: string, buffer: Buffer): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const dir = path.join('..', 'Projects', 'Repository');
			const parenthash = id;

			if (Project.checkFilename(filename)) {
				Project.error(socket, 'Bad filename.');
				return parenthash;
			}

			git.readTreeEmpty(dir);
			git.readTree(dir, parenthash);

			fs.open(path.join('..', 'Projects', 'Temp', 'whatever'), 'w', (err, fd) => {
				if (err) {
					throw 'Error opening file: ' + err;
				}
			
				fs.write(fd, buffer, 0, buffer.length, null, (err) => {
					if (err) throw 'Error writing file: ' + err;
					fs.close(fd, async () => {
						const objecthash = git.hashObject(dir, path.join('..', 'Temp', 'whatever'));
						git.addToIndex(dir, objecthash, 'Assets/' + filename);
						const treehash = git.writeTree(dir);
						const sha = git.commitTree(dir, treehash, parenthash);
						//await cache(socket, sha);
						resolve(sha);
					});
				});
			});
		});
	}

	async download(socket, args: any): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			let id = args.id;
			if (fs.existsSync(path.join('..', 'Projects', 'Archives', id + '.zip'))) {
				resolve(id);
				return;
			}
			const dir = path.join('..', 'Projects', 'Repository');
			git.branchRevision(dir, id);
			git.cloneLocal(path.join('..', 'Repository'), id, path.join('..', 'Projects', 'Archives'));

			let sevenZip = process.platform == 'win32' ? 'C:\\Program Files\\7-Zip\\7z.exe' : '7za';
			let proc = child_process.execFile(sevenZip, ['a', path.join('..', 'Projects', 'Archives', id + '.zip'), path.join('..', 'Projects', 'Archives', id)]);
			proc.addListener('close', (code, signal) => {
				resolve(id);
			});
		});
	}
}
