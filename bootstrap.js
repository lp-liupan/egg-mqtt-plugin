'use strict';

class Mqtt {

  constructor(app) {
    this.app = app;
  }


  publish(data) {
    this.app.messenger.sendToAgent('mqtt-publish', data);
  }

  subscribe(data) {
    this.app.messenger.sendToAgent('mqtt-subscribe', data);
  }

  unsubscribe(data) {
    this.app.messenger.sendToAgent('mqtt-unsubscribe', data);
  }

}

module.exports = Mqtt;
