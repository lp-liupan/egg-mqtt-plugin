'use strict';

const fs = require('fs');
const mqttClient = require('./lib/mqttClient');

class AppBootHook {

  constructor(agent) {
    this.agent = agent;
  }


  async didLoad() {
    // 建立mqtt链接
    this.agent.mqtt = mqttClient(this.agent.config.mqtt, this.agent);
  }


  async serverDidReady() {

    // 订阅
    await this.agent.mqtt.subscribe({ ...this.agent.config.mqtt.topics }, function(err, granted) {
      console.log(granted);
    });

    // 检查是否存在指定的文件，不存在就创建
    if (!fs.existsSync('./app/mqtt/subscribeMessage.js')) {
      fs.mkdirSync('./app/mqtt');
      const subscribeMessage = fs.readFileSync('./node_modules/egg-mqtt-plugin/lib/subscribeMessage.js', 'utf8');
      fs.writeFileSync('./app/mqtt/subscribeMessage.js', subscribeMessage);
    }


    this.agent.mqtt.on('message', (topic, message) => {
      // 向worker进程发送数据
      this.agent.messenger.sendRandom('mqtt-subscribe', {
        topic,
        message: message.toString(),
      });
    });

    // 注册mqtt的publish事件
    this.agent.messenger.on('mqtt-publish', data => {
      this.agent.mqtt.publish(data.topic, data.message, data.options, err => {
        this.agent.logger.coreLogger.error('[egg-mqtt-plugin] publish error : %s', err);
      });
    });
  }


}

module.exports = AppBootHook;
