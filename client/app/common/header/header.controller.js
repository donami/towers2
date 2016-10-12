class HeaderController {
  constructor($scope, AuthService) {
    'ngInject';

    this.authed = false;

    $scope.$watch(
            () => AuthService.getAuthed(),
            () => this.authed = AuthService.getAuthed()
        );
  }

}

export default HeaderController;
