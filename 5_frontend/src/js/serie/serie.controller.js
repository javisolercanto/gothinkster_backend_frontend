class SerieCtrl {
  constructor(series, $scope) {
    'ngInject';
    
    this._$scope = $scope;
    this._$scope.series = series;
  }
}

export default SerieCtrl;
