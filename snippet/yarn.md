#全局指定
yarn config set registry https://registry.npm.taobao.org

#临时指定
yarn add node-sass@4.14.1 --dev --registry=https://registry.npm.taobao.org
yarn add jst-components --registry=http://npm.jushuitan-inc.com:4873

| 表头   | 表头   |
| ------ | ------ |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

NPM YARN 说明
npm init yarn init 初始化某个项目
npm install/link yarn install/link 默认的安装依赖操作
npm install taco —save yarn add taco 安装某个依赖，并且默认保存到 package.
npm uninstall taco —save yarn remove taco 移除某个依赖项目
npm install taco —save-dev yarn add taco —dev 安装某个开发时依赖项目
npm update taco —save yarn upgrade taco 更新某个依赖项目
npm install taco --global yarn global add taco 安装某个全局依赖项目
npm publish/login/logout yarn publish/login/logout 发布/登录/登出，一系列 NPM Registry 操作
npm run/test yarn run/test 运行某个命令
