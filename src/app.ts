import 'aurelia-framework';
import '../lib/skeleton/normalize.css';
import '../lib/skeleton/skeleton.css';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config, router) {
    this.router = router;

    config.title = 'Aurelia';
    config.map([
      {
        moduleId: './splash',
        name: 'splash',
        nav: true,
        route: ['', 'splash'],
        title: 'Splash'
      }
    ]);
  }
}

export default App;
