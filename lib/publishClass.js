'use strict';

/**
 * 将publish的内容发送给agent进程，由agent进行publish
 * @param {*} app
 * @param {*} data
 */
module.exports = (app, data) => {
  app.messenger.sendToAgent('mqtt-publish', data);
};
