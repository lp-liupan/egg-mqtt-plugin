'use strict';

const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;

  }

  async serverDidReady() {

    if (this.app.config.mqtt.DataBus) {
      const src = path.join(path.resolve('./'), '/app/mqtt/DataBus.js');
      this.app.messenger.on('mqtt-subscribe', data => {
        this.app.coreLogger.info('[egg-mqtt-plugin] send to worker DataBus success!');
        (require(src))(this.app, data);
      });
    }

  }
}

module.exports = AppBootHook;
