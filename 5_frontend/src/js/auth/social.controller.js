class SocialCtrl {
    constructor(User, $state, $scope) {
        'ngInject';
        this._User = User;
        this._$state = $state;
        this._$scope = $scope;

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');

        console.log(this.authType);

        this._User.attemptAuth(this.authType, null).then(
            (res) => {
                console.log("Succesfully login");
                location.reload();
                this._$state.go('app.home')
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export default SocialCtrl;