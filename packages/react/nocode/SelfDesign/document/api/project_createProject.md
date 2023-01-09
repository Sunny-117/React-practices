[返回API列表](../API-documentation.md)
## 创建项目

#### method: `POST`
#### URL: `/project/createProject`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

|    body     |  type  | example | describe |
| :---------: | :----: | :-----: | :------: |
| projectName | string | 老板帅  |  项目名  |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "创建成功",
	"data": {
		"id": "10001",
		"createTime": 1642921562047
	}
}
```