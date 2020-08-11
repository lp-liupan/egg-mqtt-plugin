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
1.x | 😁
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
    

[详细配置](#config)    
[插件介绍](#info)    
[插件的使用](#use)   
[插件的使用.建立链接](#use-link)    
[插件的使用.发布](#use-publish)    
[插件的使用.订阅](#use-subscribe)   
[插件的使用.取消订阅](#use-unsubscribe)   
[插件的使用.监听订阅消息](#use-message)   
[Mqtt类](#mqtt)   
[示例](#example)   
[issue](#issue)   
[license](#license)   

## <span id="config">详细配置</span>

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




## <span id="info">插件介绍</span>

  使用过一些mqtt插件，发现并不能满足业务开发的需求。有的插件在生产环境和多进程环境下无法使用，为了能够在多进程下使用mqtt客户端并且能够有一个比较舒服的使用方式。     

  为了在多进程下使用mqtt，根据egg官方文档的建议，长连接的维护一般放在agent进程中。所以`egg-mqtt-plugin`插件基于`mqtt.js`在agent进程中维护长连接，并且由agent进程来完成发布和订阅事件，通过进程间的通讯由agent进程将订阅的消息内容随机的发送到一个work进程，work进程将需要发布的消息发送给agent进程。agent进程不参与具体的业务逻辑，只维护长连接和监听发布订阅事件。    

  mqtt实例运行在agent进程上，所以在work进程上无法对mqtt实例进行操作，`egg-mqtt-plugin`提供了统一数据出口(需要开启`DataBus`)和Mqtt类。


## <span id="use">插件的使用</span>

> 插件暂时没有提供publish、subscribe、unsubscribe等方法的回调函数，后续版本会实现。

### <span id="use-link">建立链接</span>

开启插件并填写好相关配置，在框架启动的时候时候会自动进行mqtt链接。

### <span id="use-publish">发布</span>

> 发布方法暂时没有提供回调函数，因为多进程的原因最好在controller（请求生命周期）中或者agent中调用，如果其他地方使用会出现重复发布的情况。

消息的发布需要使用Mqtt实例，调用Mqtt实例的`publish()`方法即可。

Mqtt类由 'egg-mqtt-start/bootstrap.js'文件暴露出来，实例化Mqtt的时候需要使用`app`作为参数。

publish()方法需要传入一个对象参数，其中包括topic、message、options等信息，更详细的参数可以参考[mqtt.publish()文档](https://www.npmjs.com/package/mqtt#connect)。

```js
'use strict';

const Mqtt = require('egg-mqtt-start/bootstrap');

const mqtt = new Mqtt(this.app);

const topic = 'xxx-xxx-xxx';
const message = '这是我要发布的信息';
const options = { qos: 0 };

mqtt.publish(topic, message, options);

```

### <span id="use-subscribe">订阅</span>

> 订阅方法暂时没有提供回调函数，后续版本会实现订阅后的回调。

订阅有两种方式，一种是通过config.default.js配置文件中`topics`参数进行配置，另一种是手动调用`subscribe()`方法。更详细的参数可以参考[mqtt.subscribe()文档](https://www.npmjs.com/package/mqtt#connect)。


```js
'use strict';

const Mqtt = require('egg-mqtt-start/bootstrap');

const mqtt = new Mqtt(this.app);

const topic = 'xxx-xxx-xxx';
const options = { qos: 0 };

mqtt.subscribe(topic, options);

```


### <span id="use-unsubscribe">取消订阅</span>

取消订阅直接调用`Mqtt`类的`unsubscribe()`方法就可以了。

```js
const Mqtt = require('egg-mqtt-start/bootstrap');

const mqtt = new Mqtt(this.app);

const topic = 'xxx-xxx-xxx';
const options = { qos: 0 };

mqtt.unsubscribe(topic, options);;

```

### <span id="use-message">监听订阅消息</span>

获取订阅的消息有两种方式，一种是开启`config.default.js`配置文件中`DataBus:true`选项（默认开启），订阅的所有消息和`app`都会统一的被发送到`/app/mqtt/DataBus.js`文件中，
开启此功能后`DataBus.js`文件会在项目启动后自动创建，也可以自己手动创建，格式如下例子：

```js
'use strict';

// /app/mqtt/DataBus.js

module.exports = async (app, data) => {
  console.log('收到数据');
  console.log(data.topic);
};

```

另一种获取订阅的消息的方式是调用`message()`方法，需要传入一个回调函数，插件会将`topic`和相应的消息信息传入回调函数的参数中。

```js

const Mqtt = require('egg-mqtt-plugin/bootstrap');

const mqtt = new Mqtt(this.app);

mqtt.message((topic, message) => {
  console.log(topic);
})

```


## <span id="Mqtt">Mqtt类</span>

`egg-mqtt-plugin`是基于`mqtt.js`进行封装并且是在`agent`进程上进行实例化的，所以在我们的业务代码中，无法使用`mqtt.js`实例提供的相应的方法，为了保证正常的时候用，
`egg-mqtt-plugin`通过`bootstrap.js`文件导出一个`Mqtt`类，在这个类中通过进程间通讯间接的实现了`mqtt.js`实例上的部分方法。目前的版本暂时没有显示部分方法的回调函数功能。

```js

const Mqtt = require('egg-mqtt-plugin/bootstrap');

// 获取mqtt实例的时候需要传入当前环境下的app对象
cosnt mqtt = new Mqtt(this.app);

// 发布
mqtt.publish('topic', '我是发布的消息体', { qos: 0 });

// 订阅
mqtt.subscribe('topic', { qos: 0 });

// 取消订阅
mqtt.unsubscribe('topic', { qos: 0 });

// 监听消息
mqtt.message((topic, message) => {
  console.log(topic);
});


```


## <span id="example">示例</span>


## <span id="issues">提问交流</span>

请到 [egg issues](https://github.com/lp-liupan/egg-mqtt-plugin/issues) 异步交流。

## <span id="license">License</span>

[MIT](LICENSE)
