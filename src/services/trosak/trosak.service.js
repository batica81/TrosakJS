// Initializes the `trosak` service on path `/trosak`
const { Trosak } = require('./trosak.class');
const createModel = require('../../models/trosak.model');
const hooks = require('./trosak.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trosak', new Trosak(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trosak');

  service.hooks(hooks);
};
