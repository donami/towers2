import template from './menu.html';
import controller from './menu.controller';
import './menu.scss';

let menuComponent = {
  restrict: 'E',
  bindings: {
    authed: '@'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default menuComponent;
