function MovieConfig($stateProvider) {
  'ngInject'

  /**
   * Ruta que nos permite acceder al listado de movies y también
   * donde puede o no recibir un párametro "categoria" que nos
   * permitirá filtrar estas movies, en el resolve realizamos un
   * GET de todas las movies que tenemos en la base de datos
   */
  $stateProvider
    .state('app.movies', {
      url: '/movies/',
      controller: 'MoviesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'movie/movies.html',
      title: 'Movie',
      resolve: {
        movies: function (Movies, $state) {
          return Movies.getMovies().then(
            (movies) => movies,
            (err) => $state.go('app.home')
          )
        },
      }
    })

  /**
   * Ruta que nos permite acceder al details de una movie en
   * concreto gracias al párametro "slug". En el resolve realizamos
   * un GET de la movie
   */
  $stateProvider
    .state("app.movie", {
      url: "/movies/movie/:slug",
      controller: "MovieCtrl",
      controllerAs: "$ctrl",
      templateUrl: "movie/movie.html",
      title: "Movie",
      resolve: {
        movie: function (Movies, $stateParams) {
          return Movies.getMovie($stateParams.slug).then(movie => movie.movie);
        }
      }
    })
};
export default MovieConfig;
