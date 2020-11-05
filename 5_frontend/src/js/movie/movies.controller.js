class MoviesCtrl {
  constructor(movies, $scope) {
    'ngInject';
    
    this._$scope = $scope;
    this._$scope.movies = movies;
    /**
     * En este caso necesitamos que nos muestre absolutamente todas las movies
     * para ello, el tipo será all y no feed por ejemplo. Como this.listConfig está escuchando al detectar éste cambio
     * automáticamente actualizará la lista con los nuevos resultados de la base de datos
     */
    this.listConfig = { type: 'all' };
  }
}

export default MoviesCtrl;
