module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [testHook],
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

// todo: refactor to use a service, not a hook
async function testHook(context) {
    const sequelize = context.app.get('sequelizeClient');

    context.result = await sequelize.query(
      'SELECT * FROM user',
      {type: sequelize.QueryTypes.SELECT}
    )

    return context
}
