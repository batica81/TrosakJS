// Initializes the `prihod` service on path `/prihod`
const { Prihod } = require('./prihod.class');
const createModel = require('../../models/prihod.model');
const hooks = require('./prihod.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/prihod', new Prihod(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('prihod');

  service.hooks(hooks);
};
