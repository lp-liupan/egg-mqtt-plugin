'use strict';

class Mqtt {

  constructor(app) {
    this.app = app;
  }


  publish(topic, message, options) {
    const data = { topic, message, options };
    this.app.messenger.sendToAgent('mqtt-publish', data);
  }

  subscribe(topic, options) {
    const data = { topic, options };
    this.app.messenger.sendToAgent('mqtt-subscribe', data);
  }

  unsubscribe(topic, options) {
    const data = { topic, options };
    this.app.messenger.sendToAgent('mqtt-unsubscribe', data);
  }

  message(callback) {
    this.app.messenger.on('mqtt-subscribe', data => {
      callback(data.topic, data.message);
    });
  }

}

module.exports = Mqtt;
