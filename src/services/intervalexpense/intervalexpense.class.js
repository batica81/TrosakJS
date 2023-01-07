/* eslint-disable no-unused-vars */

const User = require("../../models/user.model");

exports.Intervalexpense = class Intervalexpense {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {


    // console.log(user)
    const users = await User.findAll();



    // Trosak.findAll({
    //   attributes: [
    //     'foo',
    //     [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    //     'bar'
    //   ]
    // });

    return users;

  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
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
