[返回API列表](../API-documentation.md)
## 获取组件模板

#### method: `POST`
#### URL: `/other/getTemplate`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "获取成功",
	"data": {
		"templates": {
			"PositionLayout": {
				"tag": "PositionLayout",
				"style": {},
				"children": [],
				"event": []
			},
			"HorizontalLayout": {
				"tag": "HorizontalLayout",
				"style": {},
				"children": [],
				"event": []
			},
			"VerticalLayout": {
				"tag": "VerticalLayout",
				"style": {},
				"children": [],
				"event": []
			},
			"Text": {
				"tag": "Text",
				"style": {},
				"values": {
					"content": "",
				},
				"event": []
			},
			"Button": {
				"tag": "Button",
				"style": {},
				"values": {
					"content": "",
				},
				"event": []
			},
			"Image": {
				"tag": "Image",
				"style": {},
				"values": {
					"url": "",
				},
				"event": []
			}
		}
	}
}
```