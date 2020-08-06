'use strict';

const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {

    if (this.app.config.mqtt.DataBus) {
      const src = path.join(__dirname, '../../app/mqtt/DataBus.js');
      this.app.messenger.on('mqtt-subscribe', data => {
        this.app.logger.coreLogger.error('[egg-mqtt-plugin] send to worker DataBus success!');
        (require(src))(data);
      });
    }

  }
}

module.exports = AppBootHook;
