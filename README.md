# myhome
nodeJs原生http服务器,购买了一个服务器，就想用node搭建后端服务环境，正好折腾node，又不想用express，就自己写了个node服务器，支持读取常用资源和ajax请求，路由配置等等,还没有加入数据管理功能...

# 使用
克隆项目到本地
```
git clone https://github.com/donglegend/myhome
```
# Install
用了 art－template 模版引擎
```
npm install
```
# 启动
```
npm start
```
# 说明
初次模版渲染 路由在 routes 中配置，增加和 模版html相同的名字即可
所有ajax请求 路由配置在 ajax/ajaxto.js里面，api接口在api目录下
