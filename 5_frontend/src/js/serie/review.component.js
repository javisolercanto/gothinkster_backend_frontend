class ReviewCtrl {
  constructor(User, $scope) {
    'ngInject';
    /**
     * Recogemos el usuario actual para saber si puede modificar esta review
     * lo debemos realizar en un onInit porque "data" le llega a través de 
     * binding y por ello viene más lento.
     */
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
