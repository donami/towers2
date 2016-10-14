import template from './towers.html';
import controller from './towers.controller';
import './towers.scss';

let towersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default towersComponent;
