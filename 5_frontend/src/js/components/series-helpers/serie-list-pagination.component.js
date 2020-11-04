class SerieListPaginationCtrl {
  constructor($scope) {
    'ngInject';

    this._$scope = $scope;
  }

  pageRange(total) {
    let pages = [];

    for (var i = 0; i < total; i++) {
      pages.push(i + 1)
    }

    return pages;
  }

  changePage(number) {
    this._$scope.$emit('setPageTo', number);
  }

}

let SerieListPagination= {
  bindings: {
    totalPages: '=',
    currentPage: '='
  },
  controller: SerieListPaginationCtrl,
  templateUrl: 'components/series-helpers/serie-list-pagination.html'
};

export default SerieListPagination;
