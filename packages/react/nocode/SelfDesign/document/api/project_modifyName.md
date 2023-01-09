[返回API列表](../API-documentation.md)
## 修改项目名

#### method: `POST`
#### URL: `/project/modifyName`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

| body  |  type  | example  | describe |
| :---: | :----: | :------: | :------: |
|  id   | string |  10001   |  项目ID  |
| name  | string | 老板真帅 |  项目名  |

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