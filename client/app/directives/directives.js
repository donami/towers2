import CalendarDirective from './calendar.directive';
import GraphDirective from './graph.directive';
import AchievementDirective from './achievement.directive';
import HallOfFameDirective from './hall-of-fame.directive';
import MedalDirective from './medal.directive';
import PopupDirective from './popup.directive';
import SpinnerDirective from './spinner.directive';

var module = angular.module('app.directives', [])
  .directive('graph', GraphDirective.directiveFactory)
  .directive('achievement', () => new AchievementDirective())
  .directive('calendar', () => new CalendarDirective())
  .directive('hallOfFame', () => new HallOfFameDirective())
  .directive('medal', () => new MedalDirective())
  .directive('popup', () => new PopupDirective())
  .directive('spinner', () => new SpinnerDirective())

.name;

export default module;
