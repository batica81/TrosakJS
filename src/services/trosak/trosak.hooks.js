const { authenticate } = require('@feathersjs/authentication').hooks;
const  user  = require("../../models/user.model");

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

async function testHook(context) {

  if (context.params.query.monthly && context.params.query.monthly === "true") {

    // let trosak = await context.app.service('trosak');

    const users = await user.findAll();






    console.log(users)
    context.result = users
    return context;

  }
  else return context;
}
