class Popup {
  constructor() {
    this.restrict = 'AE';
    this.scope = {
      claims: '=',
      geldCollected: '=',
      geldBonus: '=',
      newMoon: '='
    };
  }

  link(scope, elem, attrs) {
    let text = '';

    if (scope.claims.length > 0) {
      text = 'You claimed ' + scope.claims.length + ' towers this day <br>';

      if (scope.claims.length == 1) {
        text = 'You claimed ' + scope.claims.length + ' tower this day <br>';
      }

      text += 'You collected ' + scope.geldCollected + ' geld <br>';
      text += 'You gained ' + scope.geldBonus + ' geld bonus <br>';
    }

    if (scope.newMoon) {
      text += 'Today is a new moon! <br>';
    }

    elem
      .addClass('tool-tip')
      .append(angular.element(
          '<div class="tooltip-container"><h3>Claims</h3><p>' + text + '</p></div>'
      ));

  }

}

export default Popup;
