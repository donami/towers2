import template from './templates/hall-of-fame.html';

class HallOfFame {
  constructor() {
    'ngInject';

    this.restrict = 'AE';
    this.replace = 'true';
    this.template = template;
  }
}

export default HallOfFame;
