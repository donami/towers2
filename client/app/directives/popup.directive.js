class Popup {
  constructor() {
    this.restrict = 'AE';
    this.scope = {
      claims: '=',
      geldCollected: '=',
      geldBonus: '=',
    };
  }

  link(scope, elem, attrs) {
    let text = 'You claimed ' + scope.claims.length + ' towers this day';

    if (scope.claims.length == 1) {
      text = 'You claimed ' + scope.claims.length + ' tower this day';
    }

    text += '<br> You collected ' + scope.geldCollected + ' geld';
    text += '<br> You gained ' + scope.geldBonus + ' geld bonus';

    elem
      .addClass('tool-tip')
      .append(angular.element(
          '<div class="tooltip-container"><h3>Claims</h3><p>' + text + '</p></div>'
      ));

  }

}

export default Popup;
