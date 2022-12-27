const assert = require('assert');
const app = require('../../src/app');

describe('\'raspored\' service', () => {
  it('registered the service', () => {
    const service = app.service('raspored');

    assert.ok(service, 'Registered the service');
  });
});
