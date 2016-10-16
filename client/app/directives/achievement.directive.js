import template from './templates/achievement.html';

class Achievement {
  constructor() {
    this.link = this.linkFunc;
    this.template = template;
    this.restrict = 'AE';
    this.scope = {
      data: '='
    };
  }

  linkFunc(scope, elem, attrs) {
    if (scope.data.createdAt) {
      scope.achieved = true;
    }
  }
}

export default Achievement;
