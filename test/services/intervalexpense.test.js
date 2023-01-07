const assert = require('assert');
const app = require('../../src/app');

describe('\'intervalexpense\' service', () => {
  it('registered the service', () => {
    const service = app.service('intervalexpense');

    assert.ok(service, 'Registered the service');
  });
});
