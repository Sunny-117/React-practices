import md5Util from './md5Util.js';
import constUtil from './constUtil.js';

let key = '60rzvvbj'; // 密钥
let set = new Set(); // 存当前生效可用的token
let map = new Map(); // 存用户账号和时间戳的对应
let timer = new Map(); // 存定时器
let time = constUtil.WEEK; // token有效时间

// 获取token
function getToken(account) {
	let now = Date.now();
	let res = md5Util.hex_md5(account + key + now);

	map.set(account, now);
	set.add(res);

	clearTimeout(timer.get(account));
	timer.set(account, setTimeout(function () {
		set.delete(res);
	}, time));

	return res;
};

// 检验token
function checkToken(account, token) {
	let now = map.get(account);
	let res = md5Util.hex_md5(account + key + now);
	if (token == res) {
		return set.has(res);
	} else {
		return false;
	}
}

export default {
	getToken,
	checkToken
};