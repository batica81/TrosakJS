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


  // <!--$now = new DateTime('now');-->
  // <!--$month = $now->format('n');-->
  // <!--$year = (int) $_GET['year'];-->
  // <!--$godisnjitrosak = 0;-->
  // <!--$allMonths = [];-->



  let year = parseInt(context.params.query.year);



  context.result = await sequelize.query(
      'SELECT sum(iznos) as iznos, month(createdAt) as mesec FROM trosak WHERE  year(createdAt) = ' + year + ' group by month(createdAt) order by month(createdAt)',
      {type: sequelize.QueryTypes.SELECT}
    )

    return context
}
