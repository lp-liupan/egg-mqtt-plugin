'use strict';

/**
 * egg-mqtt-plugin default config
 * @member Config#mqtt
 * @property {String} SOME_KEY - some description
 */
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

  DataBus: true,

  // topics: {
  //   'topic-topic-topic': { qos: 0 },
  // },
};
