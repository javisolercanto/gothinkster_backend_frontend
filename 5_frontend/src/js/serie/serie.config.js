function SerieConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.series', {
      url: '/series/:filter',
      controller: 'SeriesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'serie/series.html',
      title: 'Serie',
      resolve: {
        series: function (Series, $state) {
          return Series.getSeries().then(
            (series) => series,
            (err) => $state.go('app.home')
          )
        },
      }
    })
    $stateProvider
    .state("app.serie", {
      url: "/series/serie/:slug",
      controller: "SerieCtrl",
      controllerAs: "$ctrl",
      templateUrl: "serie/serie.html",
      title: "Serie",
      resolve: {
        serie: function (Series, $stateParams) {
          return Series.getSerie($stateParams.slug).then(serie => serie);
        },
        reviews: function (Reviews, $stateParams) {
          return Reviews.getAll($stateParams.slug).then(reviews => reviews);
        }
      }
    })
  };
export default SerieConfig;
