const { Service } = require('feathers-sequelize');
const crypto = require('crypto')

const gravatarUrl = 'https://s.gravatar.com/avatar'
const query = 's=60'

exports.User = class User extends Service {
  create(data, params) {
    const { email, password, githubId} = data;
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const avatar = `${gravatarUrl}/${hash}?${query}`

    const userdata = {
      email,
      password,
      githubId,
      avatar
    }
    return super.create(userdata, params);
  }
};
