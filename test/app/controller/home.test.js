'use strict'

const path = require('path')
const mm = require('egg-mock')

describe('test/app/controller/home.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/foo'
    });
    return app.ready();
  })
  after(() => app.close());
 
  it('should request /', () => {
    return app.httpRequest()
      .get('/')
      .expect(200);
  });
});