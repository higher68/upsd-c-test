# upsd-c-test

## 仕様

- APIのFrameWorkはNestJS
- linterはeslint, husky+lint-stagedでcommit時にcodeがfixされる
- tool管理にはasdfを使っている

## 運用

### 必要package install(asdfがinstallされている前提)

```shell
$ asdf install
```

### インストール

```bash
$ npm install
```

### 起動

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### テスト

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

#### DB周り

```shell
# localでdb起動
docker-compose up -d
# prisma配下に[ER図](prisma/ERD.md)出力
$ npm run erd:generate
# prisma初期化
npx dotenv -e .env.local -- npx prisma migrate dev --name test 
```

### Tips

- アプリ起動時、/apiでswagger uiが起動する

