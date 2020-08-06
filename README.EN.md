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

<!--
Description here.
-->

更详细的使用请阅读[中文文档](README.md)

## Install

```bash
$ npm i egg-mqtt-plugin --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mqtt = {
  enable: true,
  package: 'egg-mqtt-plugin',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.mqtt = {
  host: 'mqtt://xxx.xxx.x.x',
  port: 1883,
  username: 'username',
  password: 'password',
  clientId: 'client_id',
  options: {
    keeplive: 60,
    protocolId: 'MQTT',
    protocol: 'MQTT',
    protocolVersion: 4,
    clean: true,
    rejectUnauthorized: false,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  },
  topics: {
    'topic-topic-topic': { qos: 0 },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
