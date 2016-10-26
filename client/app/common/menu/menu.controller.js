class MenuController {
  constructor($scope, $cookies, $state, AuthService, toastr, $rootScope) {
    'ngInject';

    this.AuthService = AuthService;
    this.toastr = toastr;
    this.$state = $state;
    this.scope = $scope;
  }

  logout() {
    this.AuthService.logout();

    this.toastr.success('You are now signed out', 'Signed out');
    this.$state.go('login');
  }
}

export default MenuController;
