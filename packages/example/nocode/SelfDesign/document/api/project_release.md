[返回API列表](../API-documentation.md)
## 发布项目

#### method: `POST`
#### URL: `/project/release`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

| body  |  type   | example |    describe    |
| :---: | :-----: | :-----: | :------------: |
|  id   | string  |  10001  |     项目ID     |
| temp  | boolean |  true   | 是否是临时预览 |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "发布成功",
	"data": {
		"url": "aaa.html"
	}
}
```