### ponds-mobile-koa

#### Usage

1. Run `git clone`

2. Install dependencies: `pnpm install`

3. 在根目录下创建 `.env` 文件,文件内容示例：

```
ENV=development
DATABASE_URL='mysql://root:root@localhost:3306/ponds'
```
4. 运行`pnpm prisma migrate dev --name init`，在本地启动的 mysql 服务中，按照 '/prisma/schema.prisma' 文件中的 Model 创建表，再运行 `pnpm prisma generate`
5. 运行: `pnpm dev`.

> 如果是 mac、可能需要将 package.json 中的 dev 命令改为：`export NODE_ENV=development; ts-node-dev -r tsconfig-paths/register app.ts`

> **(Optional)** the project has built-in a docker compose, run `yarn dev:db` to run database automatic.

---

#### Project Layout

```
├── app
│   ├── controllers         ---  server controllers
│   ├── helpers             ---  helper func (interceptor / error handler / validator...)
│   ├── jobs                ---  task (periodic task / trigger task / email server...)
│   ├── entities            ---  database entities/models
│   └── services            ---  adhesive controller and model
├── config
│   ├── constants        ---  environment variable
│   ├── koa.middlewares     ---  middlewares for Koa
│   ├── routing.middlewares ---  middlewares for Routing Controller
│   ├── routing.options     ---  configs for Routing Controller
│   ├── bootstrap           ---  lifecycle
│   └── interceptors        ---  global interceptor
│   └── utils               ---  pure functions for help
└── test                    ---  utils for testcase
├── .env           ---  environment file
```

---

#### Feature

- Separation configuration and business logic.

- Export scheme model and interface, follow style of TypeScript.

- Test cases and lint configuration.

- The best practice for Dependency Injection in Koa project.

- Get constraints on your data model with Prisma.

- TypeScript hotload.

---

#### Lifecycle

1. `app.ts` -> collect env vars `constants` -> collect env files `variables.env`

2. envs ready, call `bootstrap.before()`

3. lift `routing-controllers` -> lift Koa middlewares -> register `Container` for DI

4. start Koa &amp; invoke `bootstrap.after()` after startup

---

#### Databases

The project uses Prisma as the intelligent ORM tool by default. Supports `PostgreSQL`, `MySQL` and `SQLite`.

- You can change the data type and connection method in the `.env` file
- After each modification to file `/prisma/schema.prisma`, you need to run `prisma migrate dev` to migrate the database.
- After each modification to file `/prisma/schema.prisma`, you need to run `prisma generate` to sync types.

---

#### About Environments

When nodejs is running, `ENV` does not mean `NODE_ENV`:

- After NodeJS project is built, we always run it as `NODE_ENV=PRODUCTION`, which may affect some framework optimizations.
- `NODE_ENV` only identifies the NodeJS runtime, independent of the business.
- You should use `ENV` to identify the environment.

For the data settings of each environment, you can refer to the following:

- **Development Mode** (`ENV=development`): read configurations from `configs/constants/development.ts` file, but it will still be overwritten by `.env` file.

- **Production Mode** (`ENV=production`): read configurations from `configs/constants/production.ts` file, but it will still be overwritten by `.env` file.

---

#### Reference

- [routing-controllers](https://github.com/typestack/routing-controllers)
- [Prisma](https://www.prisma.io/docs/concepts)

---

#### LICENSE

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more info.
