'use strict';

const { v4 } = require('uuid');

class Mqtt {

  constructor(app) {
    this.app = app;
    this.pid = process.pid;
  }


  publish(topic, message, options, callback) {
    const action = `mqtt-publish:${v4()}`;
    const data = { topic, message, options, action, pid: this.pid };
    this.action('mqtt-publish', data, callback, action);
  }

  subscribe(topic, options, callback) {
    const action = `mqtt-subscribe:${v4()}`;
    const data = { topic, options, action, pid: this.pid };
    this.action('mqtt-subscribe', data, callback, action);
  }

  unsubscribe(topic, options, callback) {
    const action = `mqtt-unsubscribe:${v4()}`;
    const data = { topic, options, action, pid: this.pid };
    this.action('mqtt-unsubscribe', data, callback, action);
  }

  message(callback) {
    this.app.messenger.on('mqtt-subscribe', data => {
      callback(data.topic, data.message);
    });
  }


  /**
   * 进程间通讯
   * @param {string} name
   * @param {*} data
   * @param {function} callback
   * @param {string} action
   */
  action(name, data, callback, action) {

    this.app.messenger.sendToAgent(name, data);

    // 提供回调函数
    this.app.messenger.once(action, data => {
      if (data.granted) {
        callback(data.err, data.granted);
      } else {
        callback(data);
      }
    });
  }

}

module.exports = Mqtt;
