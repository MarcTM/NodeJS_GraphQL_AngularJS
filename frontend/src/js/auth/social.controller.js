class SocialCtrl {
    // constructor(User, $state, $scope) {
    constructor(User, $state, $scope) {
      'ngInject';
      
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');

  console.log("aon estem");
      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          console.log(res);
            location.reload();
            this._$state.go('app.home');
        },
        (err) => {
          console.log(err);
          this._$state.go('app.home');
        }
      )
    }
  }

  export default SocialCtrl;