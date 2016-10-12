import template from './achievement.html';
import controller from './achievement.controller';
import './achievement.scss';

let achievementComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default achievementComponent;
