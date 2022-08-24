var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'KodeGarden',
  description: 'A garden of kode',
  script: 'D:\\KodeGarden\\Server\\out\\kodegarden.js',
  workingDirectory: 'D:\\KodeGarden\\Server'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
