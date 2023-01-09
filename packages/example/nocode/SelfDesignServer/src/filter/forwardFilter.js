import path from 'path';
import netUtil from '../utils/netUtil.js';

let staticUrl = path.resolve('webapp/');

let routes = [
	'/tutorial',
	'/project',
	'/template',
	'/projectEdit/:id'
];

function use(app) {

	// 转发
	function forwardFile(source, aim) {
		app.get(source, function (req, res) {
			if (aim == null) {
				res.sendStatus(404);
				res.send();
			} else {
				res.set({
					'Content-Type': 'text/html',
				});
				console.log(res);
				netUtil.returnResources(aim, res);
			}
		});
	}

	for (let i = 0; i < routes.length; i++) {
		forwardFile(routes[i], path.join(staticUrl, 'index.html'));
	}
}

export default {
	use,
};