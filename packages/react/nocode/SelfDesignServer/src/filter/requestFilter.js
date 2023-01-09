let fileSuffix = ['.js', '.css', '.html', '.jpg', '.jpeg', '.png', '.ico'];

function requestFilter(req, res, next) {
	let url = req._parsedUrl.pathname;
	for (let i = 0; i < fileSuffix.length; i++) {
		if (url.endsWith(fileSuffix[i])) {
			next();
			return;
		}
	}

	let method = req.method;
	let str = '';
	str += method == 'GET' ? 'GET   ' : 'POST  ';
	str += url;
	let d = new Date();
	str = d.toLocaleString() + '\t' + str;
	console.log(str);

	let data = [];
	for (let attr in req.headers) {
		if (attr == 'content-type' || attr == 'token') {
			data.push({
				type: 'header',
				attr,
				value: req.headers[attr]
			});
		}
	}
	for (let attr in req.cookies) {
		data.push({
			type: 'cookie',
			attr,
			value: req.cookies[attr]
		});
	}
	for (let attr in req.query) {
		data.push({
			type: 'query',
			attr,
			value: req.query[attr]
		});
	}
	for (let attr in req.body) {
		data.push({
			type: 'body',
			attr,
			value: req.body[attr]
		});
	}
	console.table(data);
	console.log();

	next();
}

export default {
	requestFilter,
};