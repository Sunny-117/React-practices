import projectDao from "../dao/projectDao.js";
import userDao from "../dao/userDao.js";

let templates = {
	"PositionLayout": {
		"tag": "PositionLayout",
		"style": {},
		"children": [],
		"events": [],
	},
	"HorizontalLayout": {
		"tag": "HorizontalLayout",
		"style": {},
		"children": [],
		"events": [],
	},
	"VerticalLayout": {
		"tag": "VerticalLayout",
		"style": {},
		"children": [],
		"events": [],
	},
	"Text": {
		"tag": "Text",
		"style": {},
		"values": {
			"content": "",
		},
		"events": [],
	},
	"Button": {
		"tag": "Button",
		"style": {},
		"values": {
			"content": "",
		},
		"events": [],
	},
	"Image": {
		"tag": "Image",
		"style": {},
		"values": {
			"url": "",
		},
		"events": [],
	},
};

let projectName = null;
let initData = {
	"lang": "en",
	"title": projectName,
	"icoUrl": null,
	"root": {
		"id": 1,
		"tag": "VerticalLayout",
		"style": {
			"width": "100%",
			"height": "100%",
			// 等等VerticalLayout的初始默认样式
		},
		"children": []
	}
};

async function addProject(account, name, content) {

	let user = await userDao.getUser(account);
	if (user == null) {
		return false;
	}

	// 初始化项目内容
	initData.title = name;
	let projectContent = content ? content : JSON.stringify(initData);

	let nowTime = Date.now();
	let project = {
		projectName: name,
		account: account,
		content: projectContent,
		createTime: nowTime,
		modifyTime: nowTime,
		isRelease: false
	};
	project.id = (await projectDao.addProject(project)) + '';
	if (project.id == 'false') {
		return false;
	} else {
		return project;
	}
}

async function modifyProjectName(id, name) {
	let modifyTime = Date.now();
	let res = await projectDao.updateProject(id, ['projectName', 'modifyTime'], [name, modifyTime]);
	return res ? { modifyTime } : false;
}

async function updateContent(id, content) {
	let modifyTime = Date.now();
	let res = await projectDao.updateProject(id, ['content', 'modifyTime'], [content, modifyTime]);
	return res ? { modifyTime } : false;
}

async function deleteProject(id) {
	return (await projectDao.deleteProject(id));
}

async function getUserProject(account) {
	let projects = await projectDao.getUserProject(account);
	let res = [];
	if (!projects) {
		return false;
	}
	for (let i = 0; i < projects.length; i++) {
		res.push({
			id: projects[i].id,
			name: projects[i].projectName,
			createTime: projects[i].createTime,
			modifyTime: projects[i].modifyTime
		});
	}
	return res;
}

async function getProjectInfo(id) {
	return (await projectDao.getProjectInfo(id));
}

async function getProjectContent(id) {
	return JSON.parse((await projectDao.getProjectContent(id)));
}

async function identityCheck(account, id) {
	let project = await projectDao.getProjectInfo(id);
	if (project) {
		return (account == project.account);
	} else {
		return false;
	}
}

export default {
	templates,
	addProject,
	modifyProjectName,
	updateContent,
	deleteProject,
	getUserProject,
	getProjectContent,
	getProjectInfo,
	identityCheck,
};
