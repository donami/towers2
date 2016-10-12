import angular from 'angular';
import Me from './me/me';
import Tower from './tower/tower';
import Achievement from './achievement/achievement';
import Graph from './graph/graph';
import HallOfFame from './hall-of-fame/hall-of-fame';
import Leaderboard from './leaderboard/leaderboard';
import About from './about/about';
import Login from './login/login';

let componentModule = angular.module('app.components', [
  Me,
  Tower,
  Achievement,
  Graph,
  HallOfFame,
  Leaderboard,
  About,
  Login
])

.name;

export default componentModule;
