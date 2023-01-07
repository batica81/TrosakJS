const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    all: [  ],
    find: [testHook],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

function testHook(context) {
  // return 'aaa'
  console.log(context.params.query)
  if (context.params.query.monthly && context.params.query.monthly === "true") {

    let trosakModel = context.app.get('trosak');
    //let contentsModel = context.app.get('contentsModel');
    let data = context.data;

    console.log(trosakModel)
    console.log(data)
    return context
  }
  else return context;
}
