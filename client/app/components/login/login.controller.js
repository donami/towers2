class LoginController {
  constructor($cookies, $state, AuthService, toastr, $location) {
    'ngInject';

    this.$cookies = $cookies;
    this.$state = $state;
    this.AuthService = AuthService;
    this.toastr = toastr;

    this.redirectIfAuthed();
  }

  redirectIfAuthed() {
    if (this.AuthService.getAuthed()) {
      this.$state.go('me');
    }
  }

  submitApiKey() {
    let userApiKey = this.userApiKey;

    this.AuthService.auth(userApiKey)
      .then((response) => {
        if (!response.data.playerId) {
          return Promise.reject('No player id found');
        }

        this.toastr.clear();
        this.$cookies.put('userApiKey', userApiKey);
        this.$cookies.put('userPlayerId', response.data.playerId);
        this.AuthService.setAuthed(true);

        this.toastr.success('You are now logged in', 'Success');
        this.$state.go('me');
      })
      .catch(error => {
        this.toastr.clear();
        this.toastr.error('The API key was not correct', 'Invalid API key');
      });
  }

}

export default LoginController;
