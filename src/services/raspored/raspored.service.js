// Initializes the `raspored` service on path `/raspored`
const { Raspored } = require('./raspored.class');
const createModel = require('../../models/raspored.model');
const hooks = require('./raspored.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/raspored', new Raspored(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('raspored');

  service.hooks(hooks);
};
