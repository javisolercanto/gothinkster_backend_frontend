function MovieConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.movie', {
      url: '/movies/',
      controller: 'MovieCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'movie/movies.html',
      title: 'Movie',
      resolve: {
        movies: function(Movies, $state) {
          return Movies.getMovies().then(
            (movies) => movies,
            (err) => $state.go('app.home')
          )
        }
      }
    });
  
  };
  
  export default MovieConfig;
  