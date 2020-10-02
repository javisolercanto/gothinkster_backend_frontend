class SeriesDetailsCtrl {

    constructor($scope, $state) {
        "ngInject";

        this._$scope = $scope;
        this._$scope.onBack = () => {
            $state.go('app.serie');
        }
    }
}

let SeriesDetails= {
    bindings: {
        serie: '='
    },
    controller: SeriesDetailsCtrl,
    templateUrl: "components/series-helpers/series-details.html"
};

export default SeriesDetails;