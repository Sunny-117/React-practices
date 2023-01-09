import userDao from "../dao/userDao.js";
import md5Util from "../utils/md5Util.js";

async function register(account, pwd) {
	let user = await userDao.getUser(account);
	pwd = md5Util.hex_md5(pwd);
	if (user != null) {
		return false;
	} else {
		return (await userDao.addUser({ account, pwd, username: '用户' + account, vip: 0 }));
	}
}

async function login(account, pwd) {
	let user = await userDao.getUser(account);
	if (user == null) {
		return false;
	} else {
		pwd = md5Util.hex_md5(pwd);
		return user.pwd == pwd;
	}
}

async function getUserInfo(account) {
	let user = await userDao.getUser(account);
	return { username: user.username };
}

async function modifyPwd(account, oldPwd, newpwd) {
	let user = await userDao.getUser(account);
	if (user == null) {
		return false;
	} else {
		oldPwd = md5Util.hex_md5(oldPwd);
		if (user.pwd == oldPwd) {
			newpwd = md5Util.hex_md5(newpwd);
			return (await userDao.updateUser(account, ['pwd'], [newpwd]));
		} else {
			return false;
		}
	}
}

async function modifyUserInfo(account, userInfo) {
	return (await userDao.updateUser(account, ['username'], [userInfo.username]));
}

export default {
	register,
	login,
	getUserInfo,
	modifyPwd,
	modifyUserInfo,
};