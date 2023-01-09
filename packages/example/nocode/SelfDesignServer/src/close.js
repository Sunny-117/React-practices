import fs from 'fs';
let pid = fs.readFileSync('log/pid.log');
process.kill(pid);