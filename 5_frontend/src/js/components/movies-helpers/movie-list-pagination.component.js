class MovieListPaginationCtrl {
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

let MovieListPagination= {
  bindings: {
    totalPages: '=',
    currentPage: '='
  },
  controller: MovieListPaginationCtrl,
  templateUrl: 'components/movies-helpers/movie-list-pagination.html'
};

export default MovieListPagination;
