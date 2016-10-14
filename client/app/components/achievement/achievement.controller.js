class AchievementController {
  constructor(AchievementFactory, toastr) {
    'ngInject';

    this.AchievementFactory = AchievementFactory;
    this.toastr = toastr;

    this.achievements = [];
    this.state = {
      loading: false
    };

    this.init();
  }

  init() {
    this.AchievementFactory.getAchievements()
      .then(response => this.achievements = response.data)
      .catch(error => console.log(error));
  }

  refresh() {
    this.state.loading = true;

    let earnedCount = this.achievements.filter((obj) => obj.createdAt !== null).length;

    this.AchievementFactory.refresh()
      .then((response) => {
        this.state.loading = false;

        if (response.data.length > earnedCount) {
          this.toastr.success('You have earned new achievements', 'Congratulations!');
        }

        this.init();
      })
      .catch(error => console.log(error));
  }
}

export default AchievementController;
