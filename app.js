'use strict';

const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    const src = path.join(__dirname, '../../app/mqtt/subscribeMessage.js');
    this.app.messenger.on('mqtt-subscribe', data => {
      console.log('数据进入');
      (require(src))(data);
    });
  }
}

module.exports = AppBootHook;
