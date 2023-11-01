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

### Tips

- アプリ起動時、/apiでswagger uiが起動する
