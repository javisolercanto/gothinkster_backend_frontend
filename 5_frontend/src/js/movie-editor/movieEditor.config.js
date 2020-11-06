function MovieEditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.movieEditor', {
    url: '/movieeditor/:slug',
    controller: 'MovieEditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'movie-editor/movieEditor.html',
    title: 'Movie Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      movie: function(Movies, User, $state, $stateParams) {
        if ($stateParams.slug) {
          return Movies.getMovie($stateParams.slug).then(
            (movie) => {
              if (User.current.username === movie.author.username) {
                return movie;
              } else {
                $state.go('app.home');
              }
            },
            (err) => $state.go('app.home')
          )
        } else {
          return null;
        }
      }
    }
  });

};

export default MovieEditorConfig;
