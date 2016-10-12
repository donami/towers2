class Graph {
  constructor($compile) {
    this.restrict = 'AE';
    this.replace = 'true';
    this.templateUrl = 'app/directives/templates/graph.html';
    this.scope = {
      type: '=',
      data: '=',
      labels: '=',
      series: '=',
      options: '=',
      graphTitle: '=',
      datasetoverride: '=',
    };
    this.link = this.linkFunc;

    this.$compile = $compile;
  }

  linkFunc(scope, elem, attrs) {
    let canvas = elem.find('canvas');
    switch (scope.type) {
      case 'bar':
        canvas.addClass('chart-bar');
        break;
      case 'line':
        canvas.addClass('chart-line');
        break;
      default:
        canvas.addClass('chart-bar');
    }
    // Recompile
    this.$compile(elem)(scope);
  }

  static directiveFactory($compile){
    Graph.instance = new Graph($compile);
    return Graph.instance;
  }
}
Graph.directiveFactory.$inject = ['$compile'];

export default Graph;
