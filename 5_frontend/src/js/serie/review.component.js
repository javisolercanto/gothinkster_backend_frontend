class ReviewCtrl {
  constructor(User, $scope) {
    'ngInject';

    setTimeout(() => {
      if (User.current) {
        this.canModify = (User.current.username === this.data.author.username);
      } else this.canModify = false
      $scope.$apply();
    }, 1000);
  }
}

let Review = {
  bindings: {
    data: '=',
    deleteCb: '&'
  },
  controller: ReviewCtrl,
  templateUrl: 'serie/review.html'
};

export default Review;
