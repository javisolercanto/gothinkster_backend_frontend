class ReviewCtrl {
  constructor(User, $scope) {
    'ngInject';

    this.$onInit = () => {
      if (User.current) {
        this.canModify = (User.current.username === this.data.author.username);
      } else this.canModify = false
    }
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
