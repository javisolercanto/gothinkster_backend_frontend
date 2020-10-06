class SerieCtrl {
  constructor(serie, reviews, User, Reviews, $scope, $rootScope) {
    'ngInject';

    this.serie = serie;
    this._Reviews = Reviews;

    /* this.currentUser = User.current; */

    setTimeout(() => {
      if (User.current) {
        this.canModify = (User.current.username === this.data.author.username);
      } else this.canModify = false
      $scope.$apply();
    }, 1000);

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

  addReview(){
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
