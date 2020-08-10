'use strict';

module.exports = async (app, data) => {
  console.log('收到数据');
  console.log(data.topic);
};
