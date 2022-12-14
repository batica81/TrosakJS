const assert = require('assert');
const app = require('../../src/app');

describe('\'prihod\' service', () => {
  it('registered the service', () => {
    const service = app.service('prihod');

    assert.ok(service, 'Registered the service');
  });
});
