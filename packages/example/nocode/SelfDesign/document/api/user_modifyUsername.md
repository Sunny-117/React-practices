[返回API列表](../API-documentation.md)
## 修改用户名

#### method: `POST`
#### URL: `/user/modifyUsername`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

|   body   |  type  | example | describe |
| :------: | :----: | :-----: | :------: |
| username | string |  wlbnb  |  用户名  |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "修改成功",
	"data": null
}
```