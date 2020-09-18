function SerieConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.serie', {
      url: '/series/',
      controller: 'SerieCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'serie/series.html',
      title: 'Serie',
      resolve: {
        series: function (Series, $state) {
          return Series.getSeries().then(
            (series) => series,
            (err) => $state.go('app.home')
          )
        }
      }
    })
    .state("app.detailsSerie", {
      url: "/series/:slug",
      controller: "DetailsSerieCtrl",
      controllerAs: "$ctrl",
      templateUrl: "serie/serieDetails.html",
      title: "Details Series",
      resolve: {
        serie: function (Series, $stateParams) {
          //este nombre es el que recibe el controlador
          return Series.getSerie($stateParams.slug).then(serie => serie); //recibo 1 serie
        }
      }
    })
  };
export default SerieConfig;
