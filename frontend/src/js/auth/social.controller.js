class SocialCtrl {
    constructor(User, $state, $scope) {
    // constructor(User, $state, $scope, Toastr) {
      'ngInject';
      
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
    //   this._toaster = Toastr;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');

  console.log("aon estem");
      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          console.log(res);
        //   this._toaster.showToastr('success','Successfully Logged In');
            location.reload();
            this._$state.go('app.home');
        },
        (err) => {
        //   console.log(err);
        //   this._toaster.showToastr('error','Error trying to login');
          this._$state.go('app.home');
        }
      )
    }
  }

  export default SocialCtrl;