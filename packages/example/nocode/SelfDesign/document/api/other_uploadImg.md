[返回API列表](../API-documentation.md)
## 上传图片

#### method: `POST`
#### URL: `/other/uploadImg`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

| body  | type  |  example  | describe |
| :---: | :---: | :-------: | :------: |
| file  | file  | wlbnb.png | 图片文件 |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "上传成功",
	"data": {
		"url": "1.png"
	}
}
```