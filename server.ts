import * as express from 'express';

let app = express();
require('express-ws')(app);
let wsapp: any = app;

wsapp.ws('/', (connection, request) => {
	connection.on('message', message => {
		let messagedata = JSON.parse(message);
		//connection.send(JSON.stringify({method: 'newuser', data: {user: userdata}}));
	});
});

app.use('/', express.static('./Client'));

app.listen(8765);

console.log('The monkeys are listening...');
