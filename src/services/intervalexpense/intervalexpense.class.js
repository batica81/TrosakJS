/* eslint-disable no-unused-vars */

exports.Intervalexpense = class Intervalexpense {
  constructor (options) {
    this.options = options || {};
  }


  async find (params) {
    return [];
  }



  async get (id, params) {

    const app = require('../../app');
      const sequelize = app.get('sequelizeClient');
      let year = parseInt(params.query.year);

      let  result = await sequelize.query(
        'SELECT sum(iznos) as iznos, month(createdAt) as mesec FROM trosak WHERE  year(createdAt) = ' + year + ' group by month(createdAt) order by month(createdAt)',
        {type: sequelize.QueryTypes.SELECT}
      )

    return {
      id,
      text: `A new message with ID: ${id}!`,
      res: result
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
