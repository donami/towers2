class SortingService {
  constructor() {
    'ngInject';

    this.sorting = {};
    this.filter = {};
    this.page = 1;
  }

  getPage() {
    return this.page;
  }

  getSorting() {
    return this.sorting;
  }

  getFilter() {
    return this.filter;
  }

  setPage(page) {
    this.page = page;
  }

  setSorting(sorting) {
    this.sorting = sorting;
  }

  setFilter(filter) {
    this.filter = filter;
  }

}

export default SortingService;
