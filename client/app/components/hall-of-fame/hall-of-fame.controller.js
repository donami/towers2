class HallOfFameController {
  constructor(TowerFactory) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.countries = [];
    this.state = {
      loading: true
    };

    this.init();
  }

  init() {
    return this.TowerFactory.getFirstInCountry()
              .then(response => this.countries = response.data)
              .then(() => this.state.loading = false)
              .catch(error => console.log(error));
  }
}

export default HallOfFameController;
