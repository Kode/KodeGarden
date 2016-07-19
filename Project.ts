import * as fs from 'fs';
import * as path from 'path';

export class Project {
	private directory: string;
	private mySources: string[];
	private myShaders: string[];
	private myAssets: string[];

	private sourceUpdates: {filename: string, content: string}[] = [];
	private shaderUpdates: {filename: string, content: string}[] = [];

	private committed: boolean = false;

	constructor(directory: string, parentDirectory: string) {
		this.directory = directory;
		this.mySources = fs.readdirSync(path.join(directory, 'Sources'));
		this.myShaders = fs.readdirSync(path.join(directory, 'Shaders'));
		this.myAssets = fs.readdirSync(path.join(directory, 'Assets'));
	}

	private commit(): void {
		if (this.committed) return;
		for (let update of this.sourceUpdates) {
			fs.writeFileSync(update.filename, update.content, 'utf8');
		}
		for (let update of this.shaderUpdates) {
			fs.writeFileSync(update.filename, update.content, 'utf8');
		}
		this.committed = true;
	}

	get sources(): string[] {
		return this.mySources;
	}

	addSource(source: string): void {
		this.mySources.push(source);
		if (this.committed) {
			fs.writeFileSync(source, '', 'utf8');
		}
		else {
			this.sourceUpdates.push({ filename: source, content: '' });
		}
	}

	updateSource(source: string, content: string): void {
		if (this.committed) {
			fs.writeFileSync(path.join(this.directory, 'Sources', source), content, 'utf8');
		}
		else {
			this.sourceUpdates.push({ filename: source, content: content });
		}
	}

	get shaders(): string[] {
		return this.myShaders;
	}

	addShader(shader: string): void {
		this.myShaders.push(shader);
		if (this.committed) {
			fs.writeFileSync(shader, '', 'utf8');
		}
		else {
			this.shaderUpdates.push({ filename: shader, content: '' });
		}
	}

	updateShader(source: string, content: string): void {
		if (this.committed) {
			fs.writeFileSync(path.join(this.directory, 'Shaders', source), content, 'utf8');
		}
		else {
			this.shaderUpdates.push({ filename: source, content: content });
		}
	}

	get assets(): string[] {
		return this.myAssets;
	}

	addAsset(asset: string): void {
		this.myAssets.push(asset);
	}

	compile(): void {
		this.commit();
		
	}
}
