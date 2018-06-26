const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

child_process.spawnSync('npm', ['install'], {cwd: 'Server', stdio: 'inherit', shell: true});

child_process.spawnSync('tsc', [], {cwd: 'Server', stdio: 'inherit', shell: true});

fs.mkdirSync('Projects');
fs.mkdirSync(path.join('Projects', 'Archives'));
fs.mkdirSync(path.join('Projects', 'Checkouts'));
fs.mkdirSync(path.join('Projects', 'Clones'));
fs.mkdirSync(path.join('Projects', 'Temp'));

child_process.spawnSync('git', ['clone', '--bare', 'https://github.com/Kode/KodeGarden-InitialRepository.git', 'Repository'], {cwd: 'Projects', stdio: 'inherit', shell: true});
