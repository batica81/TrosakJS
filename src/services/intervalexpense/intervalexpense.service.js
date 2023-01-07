// Initializes the `intervalexpense` service on path `/intervalexpense`
const { Intervalexpense } = require('./intervalexpense.class');
const hooks = require('./intervalexpense.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/intervalexpense', new Intervalexpense(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('intervalexpense');

  service.hooks(hooks);
};
