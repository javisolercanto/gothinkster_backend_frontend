function SerieConfig($stateProvider) {
  'ngInject';

  /**
   * Ruta que nos permite acceder al listado de series y también
   * donde puede o no recibir un párametro "categoria" que nos
   * permitirá filtrar estas series, en el resolve realizamos un
   * GET de todas las series que tenemos en la base de datos
   */
  $stateProvider
    .state('app.series', {
      url: '/series/:filter',
      controller: 'SeriesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'serie/series.html',
      title: 'Serie',
      resolve: {
        series: function (Series, $state) {
          return Series.getGraph().then(
            (series) => series,
            (err) => $state.go('app.home')
          )
        },
      }
    })

    /**
     * Ruta que nos permite acceder al details de una serie en
     * concreto gracias al párametro "slug". En el resolve realizamos
     * un GET de la serie y además de las reviews de esa serie en concreto
     */
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
