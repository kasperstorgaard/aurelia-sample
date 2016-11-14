#!/usr/bin/env ts-node
// ../custom_typings/testdouble.d.ts" />
import * as test from 'tape';
import * as td from 'testdouble';

import { App } from './app';

function setup () {
  const config = td.object(['map', 'configure']);
  const router = {};

  return {
    config,
    router,
    sut: new App()
  };
}

// function tearDown () {}

test('app.configureRouter(): router', (t) => {
  const { sut, router, config } = setup();

  sut.configureRouter(config, router);
  t.ok(sut.router,
    '.configureRouter() should set the "router" property');

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

  t.doesNotThrow(() => {
    td.verify(config.map([routeConfig]));
  }, '.configureRouter(), should set the .title property to "Aurelia"');

  t.end();
});
