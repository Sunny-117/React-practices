let src = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

function getDoubleRandom(l, r) {
	return l + Math.random() * (r - l + 1);
}

function getIntRandom(l, r) {
	return parseInt(getDoubleRandom(l, r));
}

function randomString(len) {
	let res = '';
	for (let i = 0; i < len; i++) {
		res += src[getIntRandom(0, src.length - 1)];
	}
	return res;
}

export default {
	getDoubleRandom,
	getIntRandom,
	randomString
};