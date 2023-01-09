[返回API列表](../API-documentation.md)
## 获取用户所有项目

#### method: `GET`
#### URL: `/project/getUserProject`
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
		"projectList": [{
			"id": "10001",
			"name": "老板帅",
			"createTime": 1642921562047,
			"modifyTime": 1642921562047,
			"url": "aaa.html" // 项目发布网址，如果改项目发布了，就又这个字段
		}]
	}
}
```