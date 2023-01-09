import resultUtil from "./resultUtil.js";
import tokenUtil from "./tokenUtil.js";

function check(obj) {
	let flag = true;
	for (let x in obj) {
		if (obj[x] == null || obj[x] == undefined) {
			flag = false;
			console.log(obj, x);
			break;
		}
	}
	return flag;
}

function checkUser(account, token, res) {
	// return true;
	if (!check({ account })) {
		res.send(resultUtil.accountError());
		return false;
	}

	if (!check({ token })) {
		res.send(resultUtil.paramsError());
		return false;
	}

	if (!tokenUtil.checkToken(account, token)) {
		res.send(resultUtil.tokenError());
		return false;
	}

	return true;
}

export default {
	check,
	checkUser,
};