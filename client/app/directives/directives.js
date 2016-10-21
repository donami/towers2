import CalendarDirective from './calendar.directive';
import GraphDirective from './graph.directive';
import AchievementDirective from './achievement.directive';
import HallOfFameDirective from './hall-of-fame.directive';
import MedalDirective from './medal.directive';
import PopupDirective from './popup.directive';
import SpinnerDirective from './spinner.directive';
import LastClaimedTowerDirective from './last-claimed-tower.directive';
import TowersClaimedDirective from './towers-claimed.directive';

var module = angular.module('app.directives', [])
  .directive('graph', GraphDirective.directiveFactory)
  .directive('achievement', () => new AchievementDirective())
  .directive('calendar', () => new CalendarDirective())
  .directive('hallOfFame', () => new HallOfFameDirective())
  .directive('medal', () => new MedalDirective())
  .directive('popup', () => new PopupDirective())
  .directive('spinner', () => new SpinnerDirective())
  .directive('lastClaimedTower', () => new LastClaimedTowerDirective())
  .directive('towersClaimed', () => new TowersClaimedDirective())

.name;

export default module;
