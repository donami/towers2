class TowerController {
  constructor(TowerFactory, NgTableParams) {
    'ngInject';

    this.TowerFactory = TowerFactory;

    this.towers = new NgTableParams({count: 5});

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
