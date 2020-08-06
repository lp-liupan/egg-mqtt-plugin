# egg-mqtt-plugin

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mqtt-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mqtt-plugin
[travis-image]: https://img.shields.io/travis/eggjs/egg-mqtt-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mqtt-plugin
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mqtt-plugin.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mqtt-plugin?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mqtt-plugin.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mqtt-plugin
[snyk-image]: https://snyk.io/test/npm/egg-mqtt-plugin/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mqtt-plugin
[download-image]: https://img.shields.io/npm/dm/egg-mqtt-plugin.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mqtt-plugin


## 依赖说明

### 依赖的 egg 版本

egg-mqtt-plugin 版本 | egg 2.x
--- | ---
0.0.1 | 😁
0.x | ❌


## 开启插件

```js
// config/plugin.js
exports.mqtt = {
  enable: true,
  package: 'egg-mqtt-plugin',
};

// config/default.js
config.mqtt = {
  host: 'mqtt://xxx.xxx.x.x',
  port: 1883,
  username: 'username',
  password: 'password',
  clientId: 'client_id',
  options: {},
  topics: {
    'topic-topic-topic': { qos: 0 },
  },
}
```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

配置中`options`选项的内容可以自行根据`mqtt.js`的`connect()`选项进行配置，详情可以参考[mqtt文档](https://www.npmjs.com/package/mqtt#connect)。     

配置中`topic`选项是一个对象，需要订阅的topic为属性名，值是对该订阅一些参数对象，具体可以参考`mqtt.js`的 `subscribe()`的配置，详情可以参考[mqtt文档](https://www.npmjs.com/package/mqtt#connect)。

## 插件介绍

###  
  使用过一些mqtt插件，发现并不能满足业务开发的需求。有的插件在生产环境和多进程环境下无法使用，为了能够在多进程下使用mqtt客户端并且能够有一个比较舒服的使用方式。     

  为了在多进程下使用mqtt，根据egg官方文档的建议，长连接的维护一般放在agent进程中。所以`egg-mqtt-plugin`插件基于`mqtt.js`在agent进程中维护长连接，并且由agent进程来完成发布和订阅事件，通过进程间的通讯由agent进程将订阅的消息内容随机的发送到一个work进程，work进程将需要发布的消息发送给agent进程。agent进程不参与具体的业务逻辑，只维护长连接和监听发布订阅事件。    

  mqtt实例运行在agent进程上，所以在work进程上无法对mqtt实例进行操作，`egg-mqtt-plugin`提供了统一数据出入口。


## 示例


## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
