[返回API列表](../API-documentation.md)
## 获取用户信息

#### method: `GET`
#### URL: `/user/getUserInfo`
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
		"username": "wlbnb"
	}
}
```