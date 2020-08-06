'use strict';

/**
 * egg-mqtt-plugin default config
 * @member Config#mqtt
 * @property {String} SOME_KEY - some description
 */
exports.mqtt = {
  host: 'mqtt://10.1.60.72',
  port: 1883,
  username: '9YK8J8U9spGsBFHe6Ksibg',
  password: 'SZiwACdaa7ssqbnY',
  clientId: 'MQTT_FX_Client10773',
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
    '8Gt3vrDPkasCUg5Xkw6gwv/8Y9sRPejJypA647ddwAY7i/boat/notify': { qos: 0 },
  },
};
