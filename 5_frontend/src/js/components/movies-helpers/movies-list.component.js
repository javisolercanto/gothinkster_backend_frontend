class MoviesListCtrl {

  constructor(User, Movies, $scope) {
    "ngInject";

    this._User = User;
    this._Movies = Movies;

    // We wait to receive the filters
    this.$onInit = () => {
      this.setListTo(this.listConfig);
    }

    // Listening a stage change
    $scope.$on('setListTo', (_, newList) => this.setListTo(newList));
    $scope.$on('setPageTo', (_, pageNumber) => this.setPageTo(pageNumber));
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to a new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {},
      user: this._User.getCurrent(),
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
    // Run the query
    this._Movies
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.moviesConfig;

          this.listConfig.totalPages = Math.ceil(res.moviesCount / this.limit);
        }
      );
  }
}

let MoviesList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: MoviesListCtrl,
  templateUrl: "components/movies-helpers/movies-list.html"
};

export default MoviesList;