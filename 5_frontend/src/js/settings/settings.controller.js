class SettingsCtrl {
  constructor(User, $state, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email,
      bio: User.current.bio,
      image: User.current.image,
      username: User.current.username
    }

    this.logout = User.logout.bind(User);

    this.submitForm = () => {
      this.isSubmitting = true;
      this._User.update(this.formData).then(
        (user) => {
          this._$state.go('app.profile.main', {username:user.username});
          Toastr.showToastr('success', 'Account updated!');
        },
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
          Toastr.showToastr('error', err.data);
        }
      )
    }
  }
}

export default SettingsCtrl;
