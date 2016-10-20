class SortingService {
  constructor() {
    'ngInject';

    this.sorting = {};
    this.filter = {};
  }

  getSorting() {
    return this.sorting;
  }

  getFilter() {
    return this.filter;
  }

  setSorting(sorting) {
    this.sorting = sorting;
  }

  setFilter(filter) {
    this.filter = filter;
  }

}

export default SortingService;
