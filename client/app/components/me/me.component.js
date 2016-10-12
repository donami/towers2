import template from './me.html';
import controller from './me.controller';
import './me.scss';

let meComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default meComponent;
