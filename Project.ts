import * as fs from 'fs';
import * as path from 'path';

export class Project {
	private directory: string;
	private mySources: string[];
	private myShaders: string[];
	private myAssets: string[];

	constructor(directory) {
		this.directory = directory;
		this.mySources = fs.readdirSync(path.join(directory, 'Sources'));
		this.myShaders = fs.readdirSync(path.join(directory, 'Shaders'));
		this.myAssets = fs.readdirSync(path.join(directory, 'Assets'));
	}

	get sources(): string[] {
		return this.mySources;
	}

	addSource(source: string): void {
		this.mySources.push(source);
	}

	updateSource(source: string, content: string): void {
		fs.writeFileSync(path.join(this.directory, 'Sources', source), content, 'utf8');
	}

	get shaders(): string[] {
		return this.myShaders;
	}

	addShader(shader: string): void {
		this.myShaders.push(shader);
	}

	updateShader(source: string, content: string): void {
		fs.writeFileSync(path.join(this.directory, 'Shaders', source), content, 'utf8');
	}

	get assets(): string[] {
		return this.myAssets;
	}

	addAsset(asset: string): void {
		this.myAssets.push(asset);
	}

	compile(): void {

	}
}
