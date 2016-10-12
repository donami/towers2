// validDate.$inject = ['$filter'];
function validDate($filter) {
  'ngInject';
  return function(input) {
    if (input == '0000-00-00T00:00:00Z') {
      return '-';
    }
    return $filter('date')(input);
  };
}

export default validDate;
