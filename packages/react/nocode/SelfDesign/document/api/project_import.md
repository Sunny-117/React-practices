[返回API列表](../API-documentation.md)
## 导入

#### method: `POST`
#### URL: `/project/import`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

|    body     |  type  |  example   |     describe     |
| :---------: | :----: | :--------: | :--------------: |
| projectName | string |   老板帅   |      项目名      |
|    file     |  file  | wlbnb.json | 要导入的数据文件 |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "导入成功",
	"data": {
		"id": "10001",
		"createTime": 1642921562047
	}
}
```