class SeriesListCtrl {

    constructor($scope, $state) {
        "ngInject";

        this._$scope = $scope;
        /* this._$scope.openDetails = function () {
            $state.go("app.detailsSerie", { slug: this.serie["slug"] });
          }; */
    }
}

let SeriesList = {
    bindings: {
        series: '='
    },
    controller: SeriesListCtrl,
    templateUrl: "components/series-helpers/series-list.html"
};

export default SeriesList;