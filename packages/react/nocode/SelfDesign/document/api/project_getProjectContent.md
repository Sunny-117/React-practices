[返回API列表](../API-documentation.md)
## 获取项目内容

#### method: `GET`
#### URL: `/project/getProjectContent`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

| params |  type  | example | describe |
| :----: | :----: | :-----: | :------: |
|   id   | string |  10001  |  项目ID  |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "获取成功",
	"data": {
		"content": {"a": "asd"}
	}
}
```