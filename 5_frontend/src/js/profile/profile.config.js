function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        )
      }
    }

  })
  .state('app.profile.main', {
    url:'',
    controller: 'ProfileSeriesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-series.html',
    title: 'Profile'
  })
  .state('app.profile.favorites', {
    url:'/favorites',
    controller: 'ProfileSeriesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-series.html',
    title: 'Favorites'
  })
  .state('app.profile.mainMovies', {
    url:'',
    controller: 'ProfileMoviesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-movies.html',
    title: 'Profile'
  })
  .state('app.profile.favoritesMovies', {
    url:'/favorites',
    controller: 'ProfileMoviesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-movies.html',
    title: 'Favorites'
  });

};

export default ProfileConfig;
