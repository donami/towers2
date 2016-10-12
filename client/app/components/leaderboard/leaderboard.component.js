import template from './leaderboard.html';
import controller from './leaderboard.controller';
import './leaderboard.scss';

let leaderboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default leaderboardComponent;
