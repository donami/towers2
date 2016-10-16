class HallOfFameController {
  constructor(TowerFactory) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.countries = [];

    this.init();
  }

  init() {
    return this.TowerFactory.getFirstInCountry()
              .then(response => this.countries = response.data)
              .catch(error => console.log(error));
  }
}

export default HallOfFameController;
