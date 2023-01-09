[返回API列表](../API-documentation.md)
## 修改密码

#### method: `POST`
#### URL: `/user/modifyPassword`
#### describe:

#### request:
| header |  example  | describe |
| :----: | :-------: | :------: |
| token  | asdqwezxc |   令牌   |

|  body  |  type  | example | describe |
| :----: | :----: | :-----: | :------: |
| oldPwd | string |  wlbnb  |  旧密码  |
| newPwd | string | wlbznb  |  新密码  |

#### response:
```json
{
	"flag": true,
	"code": 2000,
	"message": "修改成功",
	"data": null
}
```