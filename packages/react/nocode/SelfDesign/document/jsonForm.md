```json
{
	"lang": "ch-ZN",
	"title": "project1",
	"icoUrl": "aaa.png",
	"root": {
		"id": 1,
		"style": {},
		"tag": "swper",
		"isContainer": true,
		"values": {},
		"events": [
			{
				"type": "mouse",
				"action": "click",
				"handleType": "toast",
				// handleType 取值说明；
				// toast 提示类弹框
				// modal 类似alert
				// target 当前页面跳转
				// blank 新窗口跳转
				// jump 没过渡的锚点
				// slide 有过渡的锚点
				"argument": "www.baidu.com"
				// argument 取值说明；
				// 如果是弹框，这里就填文本
				// 如果是跳转，这里就是链接
				// 如果是锚点，这里就是节点ID
			}
		],
		"children": []
	}
}

```