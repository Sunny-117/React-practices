import fs from 'fs';
import path from 'path';
import projectService from './projectService.js';
import releaseService from './releaseService.js';
import md5Util from '../utils/md5Util.js';
import netUtil from '../utils/netUtil.js';
import mimeUtil from '../utils/mimeUtil.js';
import constUtil from '../utils/constUtil.js';

let basePath = path.resolve('./runTime/');

function randomFileName() {
	return Date.now();
}

async function uploadImage(file) {
	let fileName = randomFileName() + '.' + file.originalname.split('.').pop();
	let url = '/other/getImage?fileName=' + fileName;
	let target = path.resolve(basePath, 'resource', fileName);

	fs.readFile(path.resolve(file.path), function (err, data) {  // 异步读取文件内容
		fs.writeFile(target, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
			fs.rm(path.resolve(file.path), function (err) {
			});
		});
	});

	return url;
}

async function getFile(fileName, res) {
	console.log(fileName);
	let target = path.resolve(basePath + fileName);
	let mimeType = mimeUtil.getMimeType(fileName.split('.').pop());
	console.log(mimeType);
	res.setHeader('Content-Type', mimeType + ';charset=utf-8');
	netUtil.returnResources(target, res);
}

async function releaseProject(id, type) {
	let content = await projectService.getProjectContent(id);
	let str = releaseService.translate(content);
	let url;
	if (type) {
		let time = Date.now();
		let fileName = time + '.html';
		url = '/preview/' + time;
		let target = path.resolve(basePath, 'release', fileName);
		fs.writeFileSync(target, str);
		setTimeout(() => {
			fs.rmSync(target);
		}, constUtil.MINUTE);
	} else {
		let fileName = id + '.html';
		url = '/preview/' + id;
		let target = path.resolve(basePath, 'release', fileName);
		fs.writeFileSync(target, str);
	}
	return url;
}

async function importProject(account, name, file) {
	let content = await fs.readFileSync(path.resolve(file.path));
	await fs.rmSync(path.resolve(file.path));
	return (await projectService.addProject(account, name, content));
}

async function exportProject(id, res) {
	let content = await projectService.getProjectContent(id);
	let fileName = Date.now() + '.json';
	res.set({
		'Content-Type': 'application/octet-stream',
		'Content-Disposition': 'attachment; filename=' + fileName,
	});
	res.send(content);
}

export default {
	uploadImage,
	getFile,
	releaseProject,
	importProject,
	exportProject,
};
