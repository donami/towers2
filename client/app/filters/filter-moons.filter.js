// filterMoons.$inject = ['$filter'];
function filterMoons($filter) {
  'ngInject';
  return function(secondSelect, firstSelect) {

    if (!firstSelect)
      return secondSelect;

    var fromDate = new Date(firstSelect.iso8601);

    secondSelect = secondSelect.filter(function(obj) {
      if (new Date(obj.iso8601) >= fromDate) {
        return obj;
      }
    });

    return secondSelect;
  };
}

export default filterMoons;
