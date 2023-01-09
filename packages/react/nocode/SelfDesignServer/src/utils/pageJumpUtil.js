let start = 0;
let end = 0;
let en = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let time = 20000; // 20秒

function getDoubleRandom(l, r) {
	return l + Math.random() * (r - l + 1);
}

function getIntRandom(l, r) {
	return parseInt(getDoubleRandom(l, r));
}

function endAdd() {
	end = (end + 1) % 1000;
}

function encoding(num) {
	let chstr = '';
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += (num + 10) % 23;
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += (num + 5) % 17;
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += (num + num) % 97 + 3;
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += (num + 100) % 151;
	chstr += en[getIntRandom(0, en.length - 1)];
	chstr += en[getIntRandom(0, en.length - 1)];
	return chstr;
}

function check(num, str) {
	if (!checkNum(num)) {
		return false;
	}
	let inStr = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] >= '0' && str[i] <= '9') {
			inStr += str[i];
		}
	}
	let chstr = '';
	chstr += (num + 10) % 23;
	chstr += (num + 5) % 17;
	chstr += (num + num) % 97 + 3;
	chstr += (num + 100) % 151;
	return chstr == inStr;
}

function getData() {
	if ((start + 1) % 1000 == end) {
		return null;
	}
	let num = start + 1000;
	start = (start + 1) % 1000;
	let chstr = encoding(num);
	setTimeout(endAdd, time);
	return {
		num,
		chstr
	};
}

function checkNum(num) {
	num -= 1000;
	if (start < end) {
		return num >= end && num < 1000 || num >= 0 && num < start;
	} else {
		return num >= end && num < start;
	}
}

export default {
	getData,
	check
};
