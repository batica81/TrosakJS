const trosak = require('./trosak/trosak.service.js');
const prihod = require('./prihod/prihod.service.js');
const raspored = require('./raspored/raspored.service.js');
const user = require('./user/user.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(trosak);
  app.configure(prihod);
  app.configure(raspored);
  app.configure(user);
};
