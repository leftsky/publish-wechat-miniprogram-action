# publish-wechat-miniprogram-action

> 微信项目自动发布(小程序/小游戏/游戏插件/小程序插件)

**参数**

| 参数          | 是否必须 | 描述                                                                | 默认值         |
|-------------|------|-------------------------------------------------------------------|-------------|
| codesDir    | 必须   | 上传的代码目录                                                           | -           |
| uploadKey   | 必须   | 私钥文件内容                                                            | -           |
| version     | 必须   | 发布版本号                                                             | -           |
| description | 非必须  | 发布简介                                                              | -           |
| robot       | 非必须  | 指定使用哪一个 ci 机器人，可选值：1 ~ 30                                         | 1           |
| type        | 非必须  | 项目类型: miniProgram / miniGame / miniProgramPlugin / miniGamePlugin | miniProgram |
| env         | 非必须  | 发布环境                                                              | prod        |

## 样例

```yml
name: 'ali-oss Deploy'

on:
    push:
        branches:
            - master
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

permissions:
    contents: write
    packages: write

jobs:
    deploy:
        name: 'Deploy'
        runs-on: ubuntu-latest

        steps:
            -   uses: actions/checkout@v2
            -   uses: leftsky/publish-wechat-miniprogram-action@v1
                with:
                    codesDir: your local static path
                    uploadKey: ${{ secrets.WECHAT_UPLOAD_KEY }}
                    version: v1.0.0
                    description: "test"
                    robot: 1
```

