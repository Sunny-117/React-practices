import multer from 'multer';
import fileService from "../service/fileService.js";
import projectService from "../service/projectService.js";
import resultUtil from "../utils/resultUtil.js";
import checkUtil from "../utils/checkUtil.js";

let upload = multer({ dest: 'upload_tmp/' });

function run(app) {

	// 上传图片
	app.post('/other/uploadImg', upload.any(), async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;
		let file = req.files[0];

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		// 判断参数是否完整
		if (!checkUtil.check({ file })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 开始上传
		let url = await fileService.uploadImage(file);

		// 返回结果
		if (url) {
			res.send(resultUtil.success('上传成功', { url }));
		} else {
			res.send(resultUtil.reject('上传失败'));
		}
	});

	app.get('/other/getImage', async function (req, res) {

		// 获取参数
		let fileName = req.query.fileName;

		// 检验用户身份
		// if (!checkUtil.checkUser(account, token, res)) {
		// 	return;
		// }

		// 判断参数是否完整
		if (!checkUtil.check({ fileName })) {
			res.send(resultUtil.paramsError());
			return;
		}

		// 开始获取文件
		fileService.getFile('/resource/' + fileName, res);
	});

	app.get('/other/getTemplate', async function (req, res) {

		// 获取参数
		let token = req.headers.token;
		let account = req.cookies.account;

		// 检验用户身份
		if (!checkUtil.checkUser(account, token, res)) {
			return;
		}

		res.send(resultUtil.success('获取成功', projectService.templates));
	});

}

export default {
	run,
};
