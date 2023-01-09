[返回API列表](../API-documentation.md)
## 登录

#### method: `POST`
#### URL: `/user/login`
#### describe:

#### request:
|  body   |  type  |  example   | describe |
| :-----: | :----: | :--------: | :------: |
| account | string | asdqwezxc  | 用户账号 |
|   pwd   | string | wlbnbwlbnb |   密码   |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "登录成功",
	"data": {
		"token": "asdqwezxc"
	}
}
```