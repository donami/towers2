class FavoriteTower {
  constructor() {
    this.restrict = 'AE';
    this.replace = 'true';
    this.scope = {
      tower: '='
    };
    this.template = `
      <div>
        <h2>Favorite tower</h2>
        <div class="panel-box">
          <p>
              <a ui-sref="tower({id: tower.tower.tower_id})" ng-bind="tower.tower.meta.tower_name || ('Tower #' + tower.tower.tower_id)"></a> is your favorite tower.

              You have claimed this tower <strong ng-bind="tower.claims"></strong> times!
          </p>

          <p>
            You have collected <strong ng-bind="tower.geld_collected | number"></strong> geld on this tower
          </p>
        </div>
      </div>
    `;
  }
}

export default FavoriteTower;
