import mysqlUtil from '../utils/mysqlUtil.js';

// 获取所有用户
function getAllUser() {
	let sql = 'select * from user';
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, function (err, results, fields) {
			if (!err && results.length > 0) {
				resolve(results);
			} else {
				resolve(null);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 获取user
function getUser(account) {
	let sql = 'select * from user where account = ?';
	let arr = [account];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, arr, function (err, results, fields) {
			if (!err && results.length > 0) {
				resolve(results[0]);
			} else {
				resolve(null);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 修改用户
function updateUser(account, props, values) {
	let sql = 'update user set ';
	for (let i = 0; i < props.length - 1; i++) {
		sql += props[i] + ' = ?, ';
	}
	sql += props[props.length - 1] + ' = ? ';
	sql += 'where account = ?';
	let para = [...values, account];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, para, function (err, rows) {
			if (!err && rows.affectedRows > 0) {
				resolve(true);
			} else {
				resolve(false);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 添加用户
function addUser(user) {
	let sql = 'insert into user values(?, ?, ?, ?)';
	let para = [user.account, user.pwd, user.username, user.vip];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, para, function (err, rows) {
			if (!err && rows.affectedRows > 0) {
				resolve(true);
			} else {
				resolve(false);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

export default {
	getAllUser,
	getUser,
	updateUser,
	addUser,
};