requirejs.config({
	baseUrl: './out',
	paths: {
		domReady: '../node_modules/domready/ready.min',
		vs: '../node_modules/monaco-editor/min/vs'
	}
});

requirejs(['Editor'], () => {});
