class DetailsSerieCtrl {
  constructor(serie, $scope) {
    "ngInject";
    
    this._$scope = $scope;
    this._$scope.serie = serie;
  }
}
export default DetailsSerieCtrl;
