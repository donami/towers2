class TowerController {
  constructor($scope, TowerFactory, NgTableParams, SortingService) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.SortingService = SortingService;

    this.towers = new NgTableParams({
      count: 10,
      sorting: this.SortingService.getSorting(),
      filter: this.SortingService.getFilter(),
      page: this.SortingService.getPage()
    });

    $scope.$watch('vm.towers', (params) => {
      this.SortingService.setPage(params.page());
      this.SortingService.setSorting(params.sorting());
      this.SortingService.setFilter(params.filter());
    }, true);

    this.init();
  }

  init() {
    this.getTowers();
  }

  getTowers() {
    return this.TowerFactory.getTowers()
      .then((response) => {
        let towers = response.data;
        towers.map((obj) => {
          obj.name_sort = obj.tower_name ? obj.tower_name : 0;
          return obj;
        });
        this.towers.settings({ dataset: response.data });
      })
      .catch((error) => console.log(error));
  }

}

export default TowerController;
