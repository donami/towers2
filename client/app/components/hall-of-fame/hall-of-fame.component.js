import template from './hall-of-fame.html';
import controller from './hall-of-fame.controller';
import './hall-of-fame.scss';

let hallOfFameComponent = {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'vm'
};

export default hallOfFameComponent;
