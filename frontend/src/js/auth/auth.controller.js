class AuthCtrl {
  constructor(User, $state, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this._toastr = Toastr;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;
    
    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this._toastr.showToastr('success', 'Successfully logged in');
        this._$state.go('app.home');
      },
      (err) => {
        // console.log(err);
        this._toastr.showToastr('error', err.data);
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
