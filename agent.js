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


  async didReady() {

    // 通过配置直接订阅
    if (this.agent.config.mqtt.topics) {
      await this.agent.mqtt.subscribe({ ...this.agent.config.mqtt.topics }, (err, granted) => {
        if (err) {
          this.agent.coreLogger.error('[egg-mqtt-plugin] subscribe err : %s', err);
          return;
        }
        granted.forEach(element => {
          this.agent.logger.info('[egg-mqtt-plugin] subscribe topic: %s success!', element.topic);
        });
      });
    }


    // 检查是否需要统一的数据出口，需要存在指定的文件，不存在就创建
    if (this.agent.config.mqtt.DataBus && !fs.existsSync('./app/mqtt/DataBus.js')) {
      if (!fs.existsSync('./app/mqtt')) {
        fs.mkdirSync('./app/mqtt');
      }
      const DataBus = fs.readFileSync('./node_modules/egg-mqtt-plugin/lib/DataBus.js', 'utf8');
      fs.writeFileSync('./app/mqtt/DataBus.js', DataBus);
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
        this.agent.coreLogger.error('[egg-mqtt-plugin] publish error : %s', err);
      });
    });

    // 注册mqtt的subscribe事件
    this.agent.messenger.on('mqtt-subscribe', data => {
      this.agent.mqtt.subscribe(data.topic, data.options, (err, granted) => {
        if (err) {
          this.agent.coreLogger.error('[egg-mqtt-plugin] subscribe error : %s', err);
          return;
        }
        this.agent.coreLogger.info('[egg-mqtt-plugin] subscribe succese : %s', granted);
      });
    });

    // 注册mqtt的unsubscribe事件
    this.agent.messenger.on('mqtt-unsubscribe', data => {
      this.agent.mqtt.unsubscribe(data.topic, data.options, err => {
        this.agent.coreLogger.error('[egg-mqtt-plugin] unsubscribe error : %s', err);
      });
    });
  }


}

module.exports = AppBootHook;
