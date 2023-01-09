import multer from 'multer';
import projectService from "../service/projectService.js";
import resultUtil from "../utils/resultUtil.js";
import checkUtil from "../utils/checkUtil.js";
import fileService from "../service/fileService.js";
import netUtil from '../utils/netUtil.js';

let upload = multer({ dest: 'upload_tmp/' });

function run(app) {

	// 创建项目
	app.post('/project/createProject', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let projectName = req.body.projectName;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ projectName })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 开始创建项目
		let project = await projectService.addProject(account, projectName);

		// 返回结果
		if (project) {
			res.send(resultUtil.success('创建成功', { id: project.id, createTime: project.createTime }));
		} else {
			res.send(resultUtil.reject('创建失败'));
		}

	});

	// 删除项目
	app.post('/project/deleteProject', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.body.id;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ id })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 验证身份
		if (!(await projectService.identityCheck(account, id))) {
			res.send(resultUtil.identityError());
			return;
		}

		// 开始删除项目
		let flag = await projectService.deleteProject(id);

		// 返回结果
		if (flag) {
			res.send(resultUtil.success('删除成功'));
		} else {
			res.send(resultUtil.reject('删除失败'));
		}
	});

	// 修改项目内容
	app.post('/project/modifyContent', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.body.id;
		let content = req.body.content;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ id, content })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 验证身份
		if (!(await projectService.identityCheck(account, id))) {
			res.send(resultUtil.identityError());
			return;
		}

		// 开始修改项目内容
		let flag = await projectService.updateContent(id, content);

		// 返回结果
		if (flag) {
			res.send(resultUtil.success('修改成功', { modifyTime: flag.modifyTime }));
		} else {
			res.send(resultUtil.reject('修改失败'));
		}
	});

	// 修改项目名
	app.post('/project/modifyName', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.body.id;
		let name = req.body.name;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ id, name })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 验证身份
		if (!(await projectService.identityCheck(account, id))) {
			res.send(resultUtil.identityError());
			return;
		}

		// 开始修改项目信息
		let flag = await projectService.modifyProjectName(id, name);

		// 返回结果
		if (flag) {
			res.send(resultUtil.success('修改成功', { modifyTime: flag.modifyTime }));
		} else {
			res.send(resultUtil.reject('修改失败'));
		}
	});

	// 获取用户项目信息
	app.get('/project/getUserProject', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 开始获取
		let projectList = await projectService.getUserProject(account);

		// 返回结果
		if (projectList) {
			res.send(resultUtil.success('获取成功', { projectList }));
		} else {
			res.send(resultUtil.reject('获取失败'));
		}
	});

	// 获取项目内容
	app.get('/project/getProjectContent', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.query.id;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ id })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 验证身份
		if (!(await projectService.identityCheck(account, id))) {
			res.send(resultUtil.identityError());
			return;
		}

		// 开始获取内容
		let content = await projectService.getProjectContent(id);

		// 返回结果
		if (content) {
			res.send(resultUtil.success('获取成功', { content }));
		} else {
			res.send(resultUtil.reject('获取失败'));
		}
	});

	// 发布
	app.post('/project/release', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.body.id;
		let temp = req.body.temp; // 是否是临时

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ id, temp })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 验证身份
		if (!(await projectService.identityCheck(account, id))) {
			res.send(resultUtil.identityError());
			return;
		}

		// 开始发布
		let url = await fileService.releaseProject(id, temp);

		// 返回结果
		if (url) {
			res.send(resultUtil.success('发布成功', { url }));
		} else {
			res.send(resultUtil.reject('发布失败'));
		}
	});

	// 导出
	app.get('/project/export', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let id = req.query.id;

		// // 检验用户身份
		// if (!checkUtil.checkUser(account, token, res)) {
		// 	return;
		// }

		// 判断参数是否完整
		if (!checkUtil.check({ id })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 开始获取文件
		fileService.exportProject(id, res);
	});

	// 导入
	app.post('/project/import', upload.any(), async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let name = req.body.projectName;
		let file = req.files[0];

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ name, file })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 开始导入
		let project = await fileService.importProject(account, name, file);

		// 返回结果
		if (project) {
			res.send(resultUtil.success('导入成功', { id: project.id, createTime: project.createTime }));
		} else {
			res.send(resultUtil.reject('导入失败'));
		}
	});

	// 获取预览文件
	app.get('/preview/:fileName', function (req, res) {

		// 获取参数
		let fileName = req.params.fileName;
		

		// 返回文件
		fileService.getFile('/release/' + fileName + '.html', res);
	});
}

export default {
	run,
};
