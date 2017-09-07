import Server from './Server';
import Syntax from './Syntax';

declare var require: any;
declare var monaco: any;

require(['domReady', 'vs/editor/editor.main'], (domReady) => {
	domReady(async () => {
		let currentFile = '';
		let sha = '49cf90fc43fcd8944fe46afcf213d2235cf60dbb';
		if (window.location.hash.length > 1) {
			sha = window.location.hash.substr(1);
		}

		let khaframe = document.getElementById('application') as HTMLIFrameElement;
		khaframe.contentWindow.location.replace('/projects/' + sha + '/');

		monaco.languages.register({ id: 'haxe' });
		monaco.languages.setMonarchTokensProvider('haxe', Syntax);
		let editordiv = document.getElementById('texteditor');
		let editor = monaco.editor.create(editordiv, {
			value: '',
			language: 'haxe',
			theme: 'vs-dark'
		});

		window.onresize = () => {
			editor.layout({ width: window.innerWidth / 2, height: editordiv.clientHeight });
		};

		await Server.start();

		function addSource(source: string) {
			let sourcesElement = document.getElementById('sources');
			let tr = document.createElement('tr');
			tr.onclick = async () => {
				currentFile = source;
				editor.setValue(await Server.source(sha, source));
			};
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
		
		let sources = await Server.sources(sha);
		for (let source of sources) {
			addSource(source);
		}

		let addShaderButton = document.getElementById('addshader') as HTMLButtonElement;
		addShaderButton.onclick = () => {

		};

		let addSourceButton = document.getElementById('addsource') as HTMLButtonElement;
		addSourceButton.onclick = async () => {
			let nameElement = document.getElementById('addsourcename') as HTMLInputElement;
			let name = nameElement.value.trim();
			if (!name.endsWith('.hx')) {
				name += '.hx';
			}
			if (name.length < 44) {
				sha = await Server.addSource(sha, name);
				khaframe.contentWindow.location.replace('/projects/' + sha + '/');
				nameElement.value = '';
				addSource(name);
				window.history.pushState('', '', '#' + sha);
			}
			else {
				alert('Use a shorter name.');
			}
		};

		let button = document.getElementById('compile') as HTMLButtonElement;
		button.onclick = async () => {
			sha = await Server.setSource(sha, currentFile, editor.getValue());
			khaframe.contentWindow.location.replace('/projects/' + sha + '/');
			window.history.pushState('', '', '#' + sha);
		};

		/*let connection = new WebSocket('ws://' + window.location.host + '/');
		connection.onopen = () => {
			document.getElementById('compile').onclick = () => {
				document.getElementById('compilemessage').textContent = ' Compiling...';
				let console = document.getElementById('console');
				while (console.firstChild) {
					console.removeChild(console.firstChild);
				}
				connection.send(JSON.stringify({ method: 'compile', data: { source: editor.getValue() } }));
			};
			//connection.send(JSON.stringify({ method: 'getSource', data: { sha: sha } }));
			connection.send(JSON.stringify({ method: 'sources', id: sha }));
		};

		connection.onerror = (error) => {
			console.error('Could not connect to socket. ' + error);
		};*/

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

		/*connection.onmessage = (e) => {
			let message = JSON.parse(e.data);
			switch (message.method) {
				case 'compiled':
					document.getElementById('compilemessage').textContent = ' Compiled.';
					console.log('Reloading Kha.');
					(document.getElementById('application') as HTMLIFrameElement).contentWindow.location.replace('/projects/' + message.data.sha + '/');
					window.location.hash = '#' + message.data.sha;
					break;
				case 'errored':
					document.getElementById('compilemessage').textContent = ' Errored.';
					break;
				case 'source':
					editor.setValue(message.data.source);
					break;
				case 'compilation-message':
					addConsoleMessage(message.data.message, false);
					break;
				case 'compilation-error':
					addConsoleMessage(message.data.message, true);
					break;
			}
		};*/
	});
});
