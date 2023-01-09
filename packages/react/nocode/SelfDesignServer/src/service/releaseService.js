import md5Util from '../utils/md5Util.js';

let json = {
	"lang": "ch-ZN",
	"title": "project1",
	"icoUrl": "aaa.png",
	"root": {
		"id": 1,
		"style": {},
		"tag": "swper",
		"isContainer": true,
		"values": {},
		"event": [],
		"children": []
	}
};

let script = '';

// 将数据转化成HTML文档
function translate(content) {
	let contentStr = getNode(content.root);
	script = '';
	let res = createHtml(content.lang, content.title, content.icoUrl, contentStr, script);
	return res;
}

// 获取节点
function getNode(node) {
	let createFuncrion = nodeParser[`analysis${node.tag}`];
	analysisEvent(node);
	return createFuncrion(node);
}

// 解析事件
function analysisEvent(node) {
	if (node.event) {
		for (let e of node.event) {
			script += `addEvent(${node.id}, '${e.type}', '${e.action}', '${e.handleType}', '${e.argument}');
				`;
		}
	}
}

// 节点解析器
let nodeParser = {
	analysisText(node) {
		let res = `
			<p id="${node.id}" class="Text" style="${getStyle(node.style)}">${node.values.content}</p>
		`;
		return res;
	},
	analysisButton(node) {
		let res = `
			<button id="${node.id}" class="Button" style="${getStyle(node.style)}">${node.values.content}</button>
		`;
		return res;
	},
	analysisImage(node) {
		let res = `
			<img id="${node.id}" class="Image" style="${getStyle(node.style)}" src="${node.values.url}">
		`;
		return res;
	},
	analysisPositionLayout(node) {
		let res = `
			<div id="${node.id}" class="PositionLayout" style="${getStyle(node.style)}">
				${getChildren(node)}
			</div>
		`;
		return res;
	},
	analysisHorizontalLayout(node) {
		let res = `
			<div id="${node.id}" class="HorizontalLayout" style="${getStyle(node.style)}">
				${getChildren(node)}
			</div>
		`;
		return res;
	},
	analysisVerticalLayout(node) {
		let res = `
			<div id="${node.id}" class="VerticalLayout" style="${getStyle(node.style)}">
				${getChildren(node)}
			</div>
		`;
		return res;
	}
};

// 获取子节点
function getChildren(node) {
	let res = '';
	for (let i = 0; i < node.children.length; i++) {
		res += getNode(node.children[i]);
	}
	return res;
}

// 解析style
function getStyle(style) {
	let res = '';
	for (let attr in style) {
		res += `${attr}: ${style[attr]};`;
	}
	return res;
}

// 构造HTML文档
function createHtml(lang, title, icoUrl, content, script) {
	let res = `
		<!DOCTYPE html>
		<html lang="${lang}">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				${icoUrl ? `<link href="${icoUrl}" rel="icon" type="image/x-ico" />` : ''}
				<link rel="stylesheet" href="../release/release.css" />
				<title>${title}</title>
			</head>
			<body>
				${content}
			</body>
			<script src="../release/release.js"></script>
			<script>
				${script}
			</script>
		</html>
	`;
	return res;
}

export default {
	translate,
};

// 弃用
// 获取标记符
function getSign() {
	return md5Util.hex_md5(Math.random());
}

// 字符串构造
function constructeStr(sign, str, funArr) {
	let strArr = str.split(sign);
	let res = '';
	for (let i = 0; i < funArr.length; i++) {
		res += strArr[i] + funArr[i]();
	}
	res += strArr.pop();
	return res;
}

// 获取标签自带样式
function getDefaultStyle(node) {
	return ({
		button: {},
		text: {},
		img: {
			"background-image": 'url(' + node.values.url + ')'
		},
		container: {},
	})[node.tag];
}

// 解析标签
function analysisTag(tag) {
	return ({
		button: { label: 'button', labelNumber: 2, valueState: true },
		text: { label: 'span', labelNumber: 2, valueState: true },
		img: { label: 'div', labelNumber: 2, valueState: false },
		container: { label: 'div', labelNumber: 2, valueState: false },
	})[tag];
}
