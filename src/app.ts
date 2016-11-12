import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'splash'], name: 'splash', moduleId: './splash', nav: true, title: 'Splash' }
    ]);

    this.router = router;
  }
}
