import Server from './Server';
import Syntax from './Syntax';

declare var require: any;
declare var monaco: any;
declare var WorkerKha: any;

require(['domReady', 'vs/editor/editor.main'], (domReady) => {
	domReady(async () => {
		let currentFile = '';
		let sha = '28773311499a4587e77e02c3d083fcd52c117eee';
		if (window.location.hash.length > 1) {
			sha = window.location.hash.substr(1);
		}

		window.onhashchange = () => {
			let newsha = window.location.hash.substr(1);
			if (newsha !== sha) {
				location.reload();
			}
		};

		WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');

		monaco.languages.register({ id: 'haxe' });
		monaco.languages.setMonarchTokensProvider('haxe', Syntax);
		let editordiv = document.getElementById('texteditor');
		let editor = monaco.editor.create(editordiv, {
			value: '',
			language: 'haxe',
			theme: 'vs-dark'
		});
		let khanvas = document.getElementById('khanvas') as HTMLCanvasElement;

		function resize() {
			editor.layout({ width: window.innerWidth / 2, height: editordiv.clientHeight });
			khanvas.width = window.innerWidth / 2;
			khanvas.height = editordiv.clientHeight;
		}

		resize();

		window.onresize = () => {
			resize();
		};

		await Server.start();

		function addSource(source: string) {
			let sourcesElement = document.getElementById('sources');
			let tr = document.createElement('tr');
			tr.onclick = async () => {
				currentFile = source;
				editor.setValue(await Server.source(sha, source));
			};
			tr.style.cursor = 'pointer';
			let td1 = document.createElement('td');
			td1.innerText = source;
			let td2 = document.createElement('td');
			td2.setAttribute('align', 'right');
			let button = document.createElement('button');
			button.innerText = 'x';
			button.onclick = () => {

			};
			td2.appendChild(button);
			tr.appendChild(td1);
			tr.appendChild(td2);
			sourcesElement.appendChild(tr);
		}
		
		let sources: string[] = await Server.sources(sha);
		for (let source of sources) {
			addSource(source);
		}

		function addAsset(source: string) {
			let assetsElement = document.getElementById('assets');
			let tr = document.createElement('tr');
			tr.onclick = async () => {

			};
			tr.style.cursor = 'pointer';
			let td1 = document.createElement('td');
			td1.innerText = source;
			let td2 = document.createElement('td');
			td2.setAttribute('align', 'right');
			let button = document.createElement('button');
			button.innerText = 'x';
			button.onclick = () => {

			};
			td2.appendChild(button);
			tr.appendChild(td1);
			tr.appendChild(td2);
			assetsElement.appendChild(tr);
		}

		let assets: string[] = await Server.assets(sha);
		for (let asset of assets) {
			addAsset(asset);
		}

		let addAssetButton = document.getElementById('uploadasset') as HTMLInputElement;
		addAssetButton.onchange = (event) => {
			const reader = new FileReader();
			const file = (event.currentTarget as any).files[0];

			if (assets.indexOf(file.name) >= 0) {
				alert('Name already used.');
				return;
			}
			
			reader.onload = async (upload: any) => {
				let buffer: ArrayBuffer = upload.target.result;
				sha = await Server.addAsset(sha, file.name, buffer);
				WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');	
				addAsset(file.name);
				window.history.pushState('', '', '#' + sha);
			};

			reader.readAsArrayBuffer(file);
		};

		function addShader(shader: string) {
			let shadersElement = document.getElementById('shaders');
			let tr = document.createElement('tr');
			tr.onclick = async () => {
				currentFile = shader;
				editor.setValue(await Server.shader(sha, shader));
			};
			tr.style.cursor = 'pointer';
			let td1 = document.createElement('td');
			td1.innerText = shader;
			let td2 = document.createElement('td');
			td2.setAttribute('align', 'right');
			let button = document.createElement('button');
			button.innerText = 'x';
			button.onclick = () => {

			};
			td2.appendChild(button);
			tr.appendChild(td1);
			tr.appendChild(td2);
			shadersElement.appendChild(tr);
		}

		let shaders: string[] = await Server.shaders(sha);
		for (let shader of shaders) {
			addShader(shader);
		}

		let addShaderButton = document.getElementById('addshader') as HTMLButtonElement;
		addShaderButton.onclick = async () => {
			let nameElement = document.getElementById('addshadername') as HTMLInputElement;
			let name = nameElement.value.trim();
			if (!name.endsWith('.frag.glsl') && !name.endsWith('.vert.glsl')) {
				alert('Shader name has to end with .frag.glsl or .vert.glsl')
				return;
			}
			if (name.length >= 44) {
				alert('Use a shorter name.');
				return;
			}
			if (name.length < 1) {
				alert('use a longer name.');
				return;
			}
			if (shaders.indexOf(name) >= 0) {
				alert('Name already used.');
				return;
			}
			sha = await Server.addShader(sha, name);
			WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
			nameElement.value = '';
			addShader(name);
			shaders.push(name);
			window.history.pushState('', '', '#' + sha);
		};

		let addSourceButton = document.getElementById('addsource') as HTMLButtonElement;
		addSourceButton.onclick = async () => {
			let nameElement = document.getElementById('addsourcename') as HTMLInputElement;
			let name = nameElement.value.trim();
			if (!name.endsWith('.hx')) {
				name += '.hx';
			}
			if (name.length < 1) {
				alert('Use a longer name.');
				return;
			}
			if (name.length >= 44) {
				alert('Use a shorter name.');
				return;
			}
			if (sources.indexOf(name) >= 0) {
				alert('Name already used.');
				return;
			}
			sha = await Server.addSource(sha, name);
			WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');				
			nameElement.value = '';
			addSource(name);
			sources.push(name);
			window.history.pushState('', '', '#' + sha);
		};

		let injectButton = document.getElementById('compileinject') as HTMLButtonElement;
		injectButton.onclick = async () => {
			if (currentFile.endsWith('.hx')) {
				sha = await Server.setSource(sha, currentFile, editor.getValue());
			}
			WorkerKha.instance.inject('/projects/' + sha + '/khaworker.js');
			window.history.pushState('', '', '#' + sha);
		};

		let button = document.getElementById('compilereload') as HTMLButtonElement;
		button.onclick = async () => {
			if (currentFile.endsWith('.hx')) {
				sha = await Server.setSource(sha, currentFile, editor.getValue());
			}
			else {
				sha = await Server.setShader(sha, currentFile, editor.getValue());
			}
			WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
			window.history.pushState('', '', '#' + sha);
		};

		let downloadButton = document.getElementById('download') as HTMLButtonElement;
		downloadButton.onclick = async () => {
			await Server.download(sha);
			window.location.replace('/archives/' + sha + '.zip');
		};
	});
});
