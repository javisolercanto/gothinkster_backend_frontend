class SeriesCtrl {
  constructor(series, $scope, $stateParams) {
    'ngInject';
    
    this._$scope = $scope;
    this._$scope.series = series;
    this.category = $stateParams.filter ? $stateParams.filter : undefined;
    /**
     * En este caso necesitamos que nos muestre absolutamente todas las series
     * para ello, el tipo será all y no feed por ejemplo. Ahora, si hemos recibido
     * parámetro de categoria, nos añadirá a esta configuración el filtro de
     * categoria. Como this.listConfig está escuchando al detectar éste cambio
     * automáticamente actualizará la lista con los nuevos resultados de la base de datos
     */
    this.listConfig = { type: 'all' };
    this.category && (this.listConfig.filters = {category: this.category});
  }
}

export default SeriesCtrl;
