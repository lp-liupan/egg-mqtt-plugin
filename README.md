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
  topics: {
    'topic-topic-topic': { qos: 0 },
  },
  // options:{},
  // DataBus: true,
}
```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

|配置项|类型|必填|默认值|描述|
|:- | :-| :-| :-| :-|
|host|string|√|
|port|number|√|
|username|string|√|
|password|string|√|
|clientId|string|√|
|DataBus|boolean|×|true|是否需要统一的数据输出|
|topics|object|×| |需要订阅的topic，参照[mqtt.subsceibe()](https://www.npmjs.com/package/mqtt#connect)
|options|object|×||keeplive,connectTimeout等配置，参照[mqtt.connect()](https://www.npmjs.com/package/mqtt#connect)

> `topics`用来创建订阅，会传入`mqtt.subsceibe()`方法，`options`会传入`mqtt.connect()`方法，更加详细的配置参数请参考[文档](https://www.npmjs.com/package/mqtt#connect) 




## 插件介绍

  使用过一些mqtt插件，发现并不能满足业务开发的需求。有的插件在生产环境和多进程环境下无法使用，为了能够在多进程下使用mqtt客户端并且能够有一个比较舒服的使用方式。     

  为了在多进程下使用mqtt，根据egg官方文档的建议，长连接的维护一般放在agent进程中。所以`egg-mqtt-plugin`插件基于`mqtt.js`在agent进程中维护长连接，并且由agent进程来完成发布和订阅事件，通过进程间的通讯由agent进程将订阅的消息内容随机的发送到一个work进程，work进程将需要发布的消息发送给agent进程。agent进程不参与具体的业务逻辑，只维护长连接和监听发布订阅事件。    

  mqtt实例运行在agent进程上，所以在work进程上无法对mqtt实例进行操作，`egg-mqtt-plugin`提供了统一数据出口(需要开启`DataBus`)和Mqtt类。


## 插件的使用

### 统一的数据出口DataBus


插件默认开启了此功能，可以通过配置文件中的`DataBus:false`选项进行关闭。     

开启此功能后，可以手动创建/app/mqtt/DataBus.js文件，如果没有创建插件在运行的时候会自动创建。

```js
'use strict';

// /app/mqtt/DataBus.js

module.exports = async data => {
  console.log('收到数据');
  console.log(data.topic);
};

```

### 配置topics

可以在在配置选项`topics`中传入相应的topic和参数，插件会在启动后直接进行订阅相关topic。如果同时开启了DataBus功能，订阅后获取到的数据会直接传入DataBus.js中。

### 发布消息

消息的发布需要使用Mqtt实例，调用Mqtt实例的`publish()`方法即可。

Mqtt类由 'egg-mqtt-start/bootstrap.js'文件暴露出来，实例化Mqtt的时候需要使用`app`作为参数。

publish()方法需要传入一个对象参数，其中包括topic、message、options等信息，更详细的参数可以参考[mqtt.publish()文档](https://www.npmjs.com/package/mqtt#connect)。

```js
'use strict';

const Mqtt = require('egg-mqtt-start/bootstrap');

const mqtt = new Mqtt(this.app);

const data = {
  topic: '',
  message: '',
  options:{},
}

mqtt.publish(data);

```

### 手动订阅和取消订阅

手动订阅和取消订阅操作与发布操作相同，同样的需要引入Mqtt类，实例化后调用其`subscribe()`和`unsubscribe()`。

Mqtt类由 'egg-mqtt-start/bootstrap.js'文件暴露出来，实例化Mqtt的时候需要使用`app`作为参数。

subscribe()和unsubscribe()方法需要传入一个对象参数，其中包括topic、options等信息，更详细的参数可以参考[mqtt.subscribe()文档](https://www.npmjs.com/package/mqtt#connect)。

```js
'use strict';

const Mqtt = require('egg-mqtt-start/bootstrap');

const mqtt = new Mqtt(this.app);

const data = {
  topic: '',
  options:{},
}

mqtt.subscribe(data);

```

## 示例


## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
