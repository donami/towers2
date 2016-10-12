import DateToIsoFilter from './date-to-iso.filter';
import MoonFilter from './filter-moons.filter';
import ValidDateFilter from './valid-date.filter';

let module = angular.module('app.filters', [])
  .filter('dateToISO', DateToIsoFilter)
  .filter('filterMoons', MoonFilter)
  .filter('validDate', ValidDateFilter)

  .name;

export default module;
