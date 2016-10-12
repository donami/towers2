import template from './tower.html';
import controller from './tower.controller';
import './tower.scss';

let towerComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default towerComponent;
