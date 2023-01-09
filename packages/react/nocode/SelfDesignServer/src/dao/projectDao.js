import mysqlUtil from '../utils/mysqlUtil.js';

// 获取所有用户的项目
function getUserProject(account) {
	let sql = 'select id, projectName, createTime, modifyTime, isRelease from project where account = ?';
	let arr = [account];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, arr, function (err, results, fields) {
			if (!err) {
				resolve(results);
			} else {
				resolve(null);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 获取项目内容
function getProjectInfo(id) {
	let sql = 'select account, projectName, createTime, modifyTime, isRelease from project where id = ?';
	let arr = [id];
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

// 获取项目内容
function getProjectContent(id) {
	let sql = 'select content from project where id = ?';
	let arr = [id];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, arr, function (err, results, fields) {
			if (!err && results.length > 0) {
				resolve(results[0].content);
			} else {
				resolve(null);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 添加项目
function addProject(project) {
	let sql = 'insert into project values(null, ?, ?, ?, ?, ?, ?)';
	let para = [
		project.projectName,
		project.account,
		project.content,
		project.createTime,
		project.modifyTime,
		project.isRelease
	];
	return new Promise(function (resolve, reject) {
		let conn = mysqlUtil.getConnection();
		conn.query(sql, para, function (err, rows) {
			if (!err && rows.affectedRows > 0) {
				resolve(rows.insertId);
			} else {
				resolve(false);
			}
			mysqlUtil.recovery(conn);
		});
	});
}

// 修改项目
function updateProject(id, props, values) {
	let sql = 'update project set ';
	for (let i = 0; i < props.length - 1; i++) {
		sql += props[i] + ' = ?, ';
	}
	sql += props[props.length - 1] + ' = ? ';
	sql += 'where id = ?';
	let para = [...values, id];
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

// 删除项目
function deleteProject(id) {
	let sql = 'delete from project where id = ?';
	let para = [id];
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
	getUserProject,
	getProjectInfo,
	getProjectContent,
	addProject,
	updateProject,
	deleteProject,
};
