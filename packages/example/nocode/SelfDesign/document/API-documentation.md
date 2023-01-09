## Base Url http://159.75.249.227:8848/

## 用户相关
| API                                                  | 请求类型 | 功能         |
| :--------------------------------------------------- | :------: | :----------- |
| [/user/register](./api/user_register.md)             | **POST** | 注册         |
| [/user/login](./api/user_login.md)                   | **POST** | 登录         |
| [/user/modifyPassword](./api/user_modifyPassword.md) | **POST** | 修改密码     |
| [/user/getUserInfo](./api/user_getUserInfo.md)       | **GET**  | 获取用户信息 |
| [/user/modifyUsername](./api/user_modifyUsername.md) | **POST** | 修改用户名   |

## 项目相关
| API                                                              | 请求类型 | 功能             |
| :--------------------------------------------------------------- | :------: | :--------------- |
| [/project/createProject](./api/project_createProject.md)         | **POST** | 创建项目         |
| [/project/deleteProject](./api/project_deleteProject.md)         | **POST** | 删除项目         |
| [/project/modifyContent](./api/project_modifyContent.md)         | **POST** | 修改项目内容     |
| [/project/modifyName](./api/project_modifyName.md)               | **POST** | 修改项目名       |
| [/project/getUserProject](./api/project_getUserProject.md)       | **GET**  | 获取用户所有项目 |
| [/project/getProjectContent](./api/project_getProjectContent.md) | **GET**  | 获取项目内容     |
| [/project/release](./api/project_release.md)                     | **POST** | 发布             |
| [/project/export](./api/project_export.md)                       | **GET**  | 导出             |
| [/project/import](./api/project_import.md)                       | **POST** | 导入             |

## 其它
| API                                              | 请求类型 | 功能         |
| :----------------------------------------------- | :------: | :----------- |
| [/other/uploadImg](./api/other_uploadImg.md)     | **POST** | 上传图片     |
| [/other/getTemplate](./api/other_getTemplate.md) | **POST** | 获取组件模板 |