class TowersClaimed {
  constructor() {
    this.restrict = 'AE';
    this.template = `
      <div>
        <h2>{{ '_TOWERS_CLAIMED' | translate }}</h2>

        <spinner ng-if="claims.loading"></spinner>

        <table class="table table-striped" ng-if="!claims.loading">

          <thead>
            <tr>
              <th class="col-md-2 pointer" ng-click="sortBy('meta.tower_name', true)">{{ '_TOWER' | translate }}</th>
              <th class="col-md-2 pointer" ng-click="sortBy('claimed_on')">{{ '_CLAIMED_ON' | translate}}</th>
              <th class="col-md-5 pointer" ng-click="sortBy('formatted_address')">{{ '_ADDRESS' | translate }}</th>
              <th class="col-md-2 pointer" ng-click="sortBy('geld_collected', true)">{{ '_GELD_COLLECTED' | translate }}</th>
              <th class="col-md-1 pointer" ng-click="sortBy('geld_bonus', true)">{{ '_GELD_BONUS' | translate }}</th>
            </tr>
          </thead>

          <tbody>
            <tr ng-repeat="tower in claims | filter: filter">
              <td ng-if="!tower.meta">
                <a ui-sref="tower({id: tower.tower_id})">ID: {{ tower.tower_id }}</a>
              </td>
              <td ng-if="tower.meta">
                <a ui-sref="tower({id: tower.tower_id})">{{ tower.meta.tower_name || 'ID: ' + tower.tower_id }}</a>
              </td>
              <td>{{ tower.claimed_on | date:'mediumDate' }}</td>
              <td>{{ tower.formatted_address }}</td>
              <td>{{ tower.geld_collected | number:0 }}</td>
              <td>{{ tower.geld_bonus | number:0 }}</td>
            </tr>
          </tbody>

        </table>

        <ul uib-pagination total-items="pagination.totalItems" ng-model="pagination.currentPage" max-size="pagination.maxSize" boundary-links="true" class="pagination-sm" ng-if="!claims.loading"></ul>
      </div>
    `;
    this.scope = {
      claims: '=',
      filter: '=',
      sortBy: '=',
      pagination: '=',
    };
    this.replace = 'true';
  }
}

export default TowersClaimed;
