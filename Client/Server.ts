export default class Server {
	static connected: boolean = false;
	static socket: WebSocket;
	static calls: Map<number, any>;
	static lastId: number;

	static start(): Promise<void> {
		if (this.connected) return;
		return new Promise<void>((resolve, reject) => {
			this.calls = new Map();
			this.lastId = 0;
			this.socket = new WebSocket('ws://' + window.location.host + '/');
			this.socket.onopen = (event) => {
				this.connected = true;
				resolve();
			};
			this.socket.onmessage = (event) => {
				function addConsoleMessage(message, error) {
					let console = document.getElementById('console');
					let messages = message.trim().split('\n');
					for (let message of messages) {
						let span = document.createElement('span');
						span.textContent = message;
						if (error) span.style.color = '#cc1111';
						console.appendChild(span);
						console.appendChild(document.createElement('br'));
					}
				}

				const data = JSON.parse(event.data);
				if (data.callid) {
					this.calls[data.callid](data.ret);
				}
				else {
					switch (data.method) {
						case 'compilation-message':
							addConsoleMessage(data.data.message, false);
							break;
						case 'compilation-error':
							addConsoleMessage(data.data.message, true);
							break;
					}
				}
			};
		});
	}

	static async call(func: string, args: any): Promise<any> {
		await this.start();
		return new Promise((resolve, reject) => {
			args.func = func;
			args.callid = ++this.lastId;
			this.socket.send(JSON.stringify(args));
			this.calls[this.lastId] = resolve;
		});
	}

	static async sources(id: string): Promise<any> {
		return await this.call('sources', {id: id});
	}

	static async source(id: string, file: string): Promise<any> {
		return await this.call('source', {id: id, file: file});
	}

	static async setSource(id: string, file: string, content: string): Promise<any> {
		return await this.call('setSource', {id: id, file: file, content: content});
	}

	static async addSource(id: string, file: string): Promise<any> {
		return await this.call('addSource', {id: id, file: file});
	}

	static async shaders(id: string): Promise<any> {
		return await this.call('shaders', {id: id});
	}

	static async shader(id: string, file: string): Promise<any> {
		return await this.call('shader', {id: id, file: file});
	}

	static async setShader(id: string, file: string, content: string): Promise<any> {
		return await this.call('setShader', {id: id, file: file, content: content});
	}

	static async addShader(id: string, file: string): Promise<any> {
		return await this.call('addShader', {id: id, file: file});
	}

	static concat(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
		let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	}

	static arrayBufferFromString(str: string) {
		let buffer = new ArrayBuffer(str.length * 2);
		let view = new Uint16Array(buffer);
		for (let i = 0; i < str.length; ++i) {
			view[i] = str.charCodeAt(i);
		}
		return buffer;
	}

	static async assets(id: string): Promise<any> {
		return await this.call('assets', {id: id});
	}

	static async addAsset(id: string, filename: string, buffer: ArrayBuffer): Promise<any> {
		return new Promise<string>((resolve, reject) => {
			let headContent = this.arrayBufferFromString(id + '/' + filename);
			let headBuffer = new ArrayBuffer(8);
			let headView = new Uint32Array(headBuffer);
			headView[0] = ++this.lastId;
			headView[1] = headContent.byteLength;
			let head = this.concat(headBuffer, headContent);
			this.socket.send(this.concat(head, buffer));
			this.calls[this.lastId] = resolve;
		});
	}

	static async download(id: string): Promise<any> {
		return await this.call('download', {id: id});
	}
}
