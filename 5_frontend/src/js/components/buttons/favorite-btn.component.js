class FavoriteBtnCtrl {
  constructor(User, Series, $state) {
    'ngInject';

    this._User = User;
    this._Series = Series;
    this._$state = $state;

  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    if (this.serie.favorited) {
      this._Series.unfavorite(this.serie.slug).then(
        () => {
          this.isSubmitting = false;
          this.serie.favorited = false;
          this.serie.favoritesCount--;
        }
      )

    } else {
      this._Series.favorite(this.serie.slug).then(
        () => {
          this.isSubmitting = false;
          this.serie.favorited = true;
          this.serie.favoritesCount++;
        }
      )
    }

  }

}

let FavoriteBtn= {
  bindings: {
    serie: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
