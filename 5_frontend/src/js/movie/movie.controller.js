class MovieCtrl {
  constructor(User, movie, $scope, $rootScope) {
    'ngInject';

    this.movie = movie;
    this._$scope = $scope;
    this._User = User;

    this.currentUser = this._User.current;

    $rootScope.setPageTitle(this.movie.title);
  }
}


export default MovieCtrl;
