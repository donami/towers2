class Achievement {
  constructor() {
    this.link = this.linkFunc;
    this.templateUrl = 'app/directives/templates/achievement.html';
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
