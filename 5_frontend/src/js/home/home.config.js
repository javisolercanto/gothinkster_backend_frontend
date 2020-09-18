function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      movies: function (Movies, $state) {
        return Movies.getMovies().then(
          (movies) => movies,
          (err) => $state.go('app.home')
        )
      },
      series: function (Series, $state) {
        return Series.getSeries().then(
          (series) => series,
          (err) => $state.go('app.home')
        )
      },
    }
  });

};

export default HomeConfig;
