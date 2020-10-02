class SerieCtrl {
  constructor(series, $scope, $stateParams) {
    'ngInject';
    
    this._$scope = $scope;
    this._$scope.series = series;
    this._$scope.filter = $stateParams.filter;

    this._$scope.filter && (this._$scope.series = this._$scope.series.filter((serie) => {
      return serie.category ===  this._$scope.filter;
    }));
  }
}

export default SerieCtrl;
