class AuthCtrl {
  constructor($state, User, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this.submitForm = (status) => {
      if (!status) Toastr.showToastr('error', 'Debe rellenar todos los datos correctamente');
      else {
        /* if (this.authType === 'register') { */
          this.isSubmitting = true;

          this._User.attemptAuth(this.authType, this.formData).then(
            (res) => {
              this._$state.go('app.home');
              Toastr.showToastr('success', 'Successful '.concat(this.authType === 'register' ? "register" : "login"));
            },
            (err) => {
              Toastr.showToastr('error', err.data);

              this.isSubmitting = false;
              this.errors = err.data.errors;
            }
          )
        /* } */ /* else {
          console.log(this._User);
        } */
      }
    };
  }
}

export default AuthCtrl;
