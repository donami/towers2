import angular from 'angular';
import Menu from './menu/menu';
import Header from './header/header';
import Footer from './footer/footer';

let commonModule = angular.module('app.common', [
  Menu,
  Header,
  Footer,
])

.name;

export default commonModule;
