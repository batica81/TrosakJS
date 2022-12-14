const assert = require('assert');
const app = require('../../src/app');

describe('\'trosak\' service', () => {
  it('registered the service', () => {
    const service = app.service('trosak');

    assert.ok(service, 'Registered the service');
  });
});
