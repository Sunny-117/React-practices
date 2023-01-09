import fs from 'fs';
import userService from "../service/userService.js";
import projectService from "../service/projectService.js";
import releaseService from "../service/releaseService.js";
import checkUtil from "../utils/checkUtil.js";

let testContent = {
	"lang": "ch-ZN",
	"title": "testProject",
	"icoUrl": null,
	"root": {
		"id": 1,
		"tag": "VerticalLayout",
		"style": {
			"width": "100%",
			"height": "100%",
		},
		"children": [
			{
				"id": 2,
				"tag": "PositionLayout",
				"style": {
					"width": "200px",
					"height": "200px",
					"background-color": "skyblue",
				},
				"children": [
					{
						"id": 3,
						"tag": "Text",
						"values": {
							"content": "当前页跳到百度"
						},
						"style": {
							"width": "100px",
							"height": "30px",
							"background-color": "pink",
						},
						"event": [
							{
								"type": "mouse",
								"action": "click",
								"handleType": "target",
								"argument": "http://www.baidu.com"
							}
						]
					},
					{
						"id": 4,
						"tag": "Button",
						"values": {
							"content": "新窗口打开百度按钮"
						},
						"style": {
							"width": "300px",
							"height": "50px",
							"background-color": "#999",
						},
						"event": [
							{
								"type": "mouse",
								"action": "click",
								"handleType": "blank",
								"argument": "https://www.baidu.com"
							}
						],
					},
					{
						"id": 9,
						"tag": "Button",
						"values": {
							"content": "点击跳到文本3"
						},
						"style": {
							"width": "200px",
							"height": "50px",
							"background-color": "#999",
						},
						"event": [
							{
								"type": "mouse",
								"action": "click",
								"handleType": "jump",
								"argument": 7
							}
						],
					},
					{
						"id": 10,
						"tag": "Button",
						"values": {
							"content": "点击滑到文本3"
						},
						"style": {
							"width": "200px",
							"height": "50px",
							"background-color": "#999",
						},
						"event": [
							{
								"type": "mouse",
								"action": "click",
								"handleType": "slide",
								"argument": 7
							}
						],
					},
				],
				"event": [
					{
						"type": "mouse",
						"action": "click",
						"handleType": "toast",
						"argument": "PositionLayout点击toast啦啦啦啦啦"
					}
				]
			},
			{
				"id": 5,
				"tag": "Text",
				"values": {
					"content": "文本2"
				},
				"style": {
					"width": "300px",
					"height": "100px",
					"background-color": "yellow",
					"color": "#fff",
				},
				"event": [
					{
						"type": "mouse",
						"action": "click",
						"handleType": "alert",
						"argument": "文本2点击alert啦啦啦啦啦"
					}
				]
			},
			{
				"id": 6,
				"tag": "Text",
				"values": {
					"content": "用来撑地方的"
				},
				"style": {
					"display": "block",
					"width": "300px",
					"height": "1000px",
					"background-color": "green",
					"color": "#fff",
				},
			},
			{
				"id": 7,
				"tag": "Text",
				"values": {
					"content": "文本3"
				},
				"style": {
					"width": "100px",
					"height": "30px",
					"background-color": "pink",
				},
			},
			{
				"id": 8,
				"tag": "Text",
				"values": {
					"content": "用来撑地方的"
				},
				"style": {
					"display": "block",
					"width": "300px",
					"height": "1000px",
					"background-color": "green",
					"color": "#fff",
				},
			}
		]
	}
};

async function test() {
	let res = await projectService.addProject('admin', 'testbug');
	// let res = releaseService.translate(testContent);
	// fs.writeFileSync('C:/Users/Administrator/Desktop/test.html', res);
	process.exit();
};

test();
