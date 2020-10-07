function SerieEditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.serieEditor', {
    url: '/serieeditor/:slug',
    controller: 'SerieEditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'serie-editor/serieEditor.html',
    title: 'Serie Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      serie: function(Series, User, $state, $stateParams) {
        if ($stateParams.slug) {
          return Series.getSerie($stateParams.slug).then(
            (serie) => {
              if (User.current.username === serie.author.username) {
                return serie;
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

export default SerieEditorConfig;
