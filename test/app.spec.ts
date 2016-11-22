import * as test from 'tape';
import * as td from 'testdouble';

import { App } from '../src/app';

function setup () {
  const config = td.object(['map', 'configure']);
  const router = {};

  return {
    config,
    router,
    sut: new App()
  };
}

test('app.configureRouter(): router', (t) => {
  const { sut, router, config } = setup();

  sut.configureRouter(config, router);
  t.ok(sut.router, 'should set the "router" property');

  t.end();
});

test('app.configureRouter(): title', (t) => {
  const { sut, router, config } = setup();

  const routeConfig = {
    moduleId: './splash',
    name: 'splash',
    nav: true,
    route: ['', 'splash'],
    title: 'Splash'
  };

  sut.configureRouter(config, router);

  try {
    td.verify(config.map([routeConfig]));
    t.pass('should be called with [routeConfig]');
  } catch (e) {
    t.fail(e.message);
  }

  t.end();
});
