class SerieCtrl {
  constructor(User, serie, reviews, Reviews, $scope, $rootScope) {
    'ngInject';

    this._Reviews = Reviews;
    this.serie = serie;
    this.reviews = reviews;
    this._$scope = $scope;
    this._User = User;

    this.currentUser = this._User.current;

    $rootScope.setPageTitle(this.serie.title);

    this.resetReviewForm();
  }

  /**
   * Este método permite restaurar los valores por defecto del
   * formulario de creación de review para, una vez creada una
   * poder seguir creando más
   */
  resetReviewForm() {
    this.reviewForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

  /**
   * Añadimos una review, asociada a la serie actual (this.serie.slug) y 
   * con el contenido del textarea (this.reviewForm.body)
   */
  addReview() {
    this.reviewForm.isSubmitting = true;

    this._Reviews.add(this.serie.slug, this.reviewForm.body).then(
      (review) => {
        this.reviews.unshift(review);
        this.resetReviewForm();
      },
      (err) => {
        this.reviewForm.isSubmitting = false;
        this.reviewForm.errors = err.data.errors;
      }
    )
  }

  /**
   * 
   * Para borrar una review debemos saber cual es su slug (reviewId) y
   * el índice en el array de reviews para eliminarla también de la vista
   * llamamos a destroy para que la borre en la base de datos y a splice 
   * para eliminarla del array
   * 
   * @param  reviewId 
   * @param  index 
   */
  deleteReview(reviewId, index) {
    this._Reviews.destroy(reviewId, this.serie.slug).then(
      (success) => {
        this.reviews.splice(index, 1);
      }
    )
  }
}


export default SerieCtrl;
