function initKodeGarden(editor) {
	let connection = new WebSocket('ws://' + window.location.host + '/');

	connection.onopen = () => {
		document.getElementById('compile').onclick = () => {
			connection.send(JSON.stringify({
				method: 'compile',
				data: {
					source: editor.getValue()
				}
			}));
		};
	};

	connection.onerror = (error) => {
		console.error('Could not connect to socket. ' + error);
	};

	connection.onmessage = (e) => {
		let message = JSON.parse(e.data);
		switch (message.method) {
			case 'compiled':
				document.getElementById('khaframe').contentWindow.location.reload();
				break;
		}
	};
}
