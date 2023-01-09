import fs from 'fs';
import path from 'path';
let logFolder = path.resolve('../../log/');

function logRequest(text) {
	fs.appendFileSync(path.join(logFolder, 'request.log'), text + '\n');
}

export default {
	logRequest,
};