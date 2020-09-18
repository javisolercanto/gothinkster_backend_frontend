class HomeCtrl {
  constructor(movies, series, User, Tags, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Filter by releaseYear
    let moviesFiltered = [];
    movies.map((m) => {
      return m.releaseYear > 1996 && moviesFiltered.push(m);
    })

    // Filter by seasons
    let seriesFiltered = []
    series.map((s) => {
      return s.seasons > 4 && seriesFiltered.push(s)
    })

    this._$scope.movies = moviesFiltered;
    this._$scope.series = seriesFiltered;


    // Get list of all tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
