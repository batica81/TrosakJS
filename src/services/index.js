const trosak = require('./trosak/trosak.service.js');
const prihod = require('./prihod/prihod.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(trosak);
  app.configure(prihod);
};
