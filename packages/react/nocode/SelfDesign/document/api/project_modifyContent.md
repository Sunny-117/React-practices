[返回API列表](../API-documentation.md)
## 修改项目内容

#### method: `POST`
#### URL: `/project/modifyContent`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

|  body   |  type  |   example   |      describe      |
| :-----: | :----: | :---------: | :----------------: |
|   id    | string |    10001    |       项目ID       |
| content | string | {"a":"asd"} | 项目内容JSON字符串 |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "修改成功",
	"data": {
		"modifyTime": 1642921562047
	}
}
```