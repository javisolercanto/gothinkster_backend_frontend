class SerieCtrl {
  constructor(serie, reviews, current, Reviews, $rootScope) {
    'ngInject';

    this._Reviews = Reviews;
    this.serie = serie;
    this.reviews = reviews;

    this.currentUser = current;

    $rootScope.setPageTitle(this.serie.title);

    this.resetReviewForm();
  }

  resetReviewForm() {
    this.reviewForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

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

  deleteReview(reviewId, index) {
    this._Reviews.destroy(reviewId, this.serie.slug).then(
      (success) => {
        this.reviews.splice(index, 1);
      }
    )
  }

}


export default SerieCtrl;
