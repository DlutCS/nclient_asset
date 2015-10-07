# nclient_asset
Software Comprehensive Practice - Front End JS/CSS

## 目录结构
```
nclient_asset
    ./build         构建目录
    ./src           源代码目录
      ./assets
        ./css       css/Sass
        ./js        javascript/ECMAScript6
    webpack.config.js webpack构建配置（生产构建 和 开发构建）
    Gruntfile.js    Grunt工具配置文件(暂未修改至使用) 
    package.json    npm依赖包配置
```

## 安装
1.确保本地安装nodejs, npm, grunt, webpack, make工具可用

2.环境初始化, pip依赖安装
```
npm install
```
3.开发环境测试(可选)
```
npm run dev
```
4.生产环境构建
```
npm run build
```