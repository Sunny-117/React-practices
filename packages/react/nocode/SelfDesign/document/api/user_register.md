[返回API列表](../API-documentation.md)
## 注册

#### method: `POST`
#### URL: `/user/register`
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
	"message": "注册成功",
	"data": null
}
```