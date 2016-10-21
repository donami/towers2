class LastClaimedTower {
  constructor() {
    this.restrict = 'AE';
    this.template = `
      <div>

        <h2>{{ '_LATEST_CLAIMED_TOWER' | translate }}</h2>

        <spinner ng-if="tower.loading">Loading</spinner>

        <table class="table table-striped table-bordered" ng-if="!tower.loading">
          <tr>
            <th>{{ '_NAME' | translate }}:</th>
            <td><a ui-sref="tower({id: tower.tower_id})">{{ tower.info.tower_name || 'ID: ' + tower.tower_id }}</a></td>
          </tr>
          <tr>
            <th>{{ '_BUILD_DATE' | translate }}:</th>
            <td>{{ tower.info.created_on || '-' | date:'mediumDate' }}</td>
          </tr>
          <tr>
            <th>{{ '_ADDRESS' | translate }}:</th>
            <td>{{ tower.info.formatted_address || '-' }}</td>
          </tr>
          <tr>
            <th>{{ '_TOWER_FIRST_CLAIMED_ON' | translate }}:</th>
            <td>{{ tower.stats.first_claimed_on || '-' | date:'mediumDate' }}</td>
          </tr>
          <tr>
            <th>{{ '_TOWER_LAST_CLAIMED_ON' | translate }}:</th>
            <td>{{ tower.stats.last_claimed_on || '-' | date:'mediumDate' }}</td>
          </tr>
          <tr>
            <th>{{ '_TOWER_GELD_COLLECTED' | translate }}:</th>
            <td>{{ tower.stats.total_geld_collected || '-' | number }}</td>
          </tr>
          <tr>
            <th>{{ '_TOWER_GELD_BONUS' | translate }}:</th>
            <td>{{ tower.stats.total_geld_bonus || '-' | number }}</td>
          </tr>
        </table>

      </div>
    `;
    this.replace = 'true';
    this.scope = {
      tower: '=',
    };
  }
}

export default LastClaimedTower;
