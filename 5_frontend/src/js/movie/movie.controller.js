import marked from 'marked';

class MovieCtrl {
  constructor(movies, User, $scope) {
    'ngInject';

    this._$scope = $scope;
    this._$scope.movies = movies;
    this.currentUser = User.current;
  }
}

export default MovieCtrl;
