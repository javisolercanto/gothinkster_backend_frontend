class SerieActionsCtrl {
  constructor(Series, User, $scope, $state) {
    'ngInject';

    this._Series = Series;
    this._$state = $state;

    setTimeout(() => {
      if (User.current) {
        this.canModify = (User.current.username === this.serie.author.username);
      } else this.canModify = false
      $scope.$apply();
    }, 1000);

  }

  deleteSerie() {
    this.isDeleting = true;
    this._Series.destroy(this.serie.slug).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    )
  }
}

let SerieActions = {
  bindings: {
    serie: '='
  },
  controller: SerieActionsCtrl,
  templateUrl: 'serie/serie-actions.html'
};

export default SerieActions;
