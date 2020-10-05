class FavoriteFoodBtnCtrl {
    constructor(User, Foods, $state) {
      'ngInject';
  
      this._User = User;
      this._Foods = Foods;
      this._$state = $state;
  
    }
  
    submit() {
      this.isSubmitting = true;
  
      if (!this._User.current) {
        this._$state.go('app.login');
        return;
      }
  
      if (this.food.favorited) {
        this._Foods.unfavorite(this.food.slug).then(
          () => {
            this.isSubmitting = false;
            this.food.favorited = false;
            this.food.favoritesCount--;
          }
        )
  
      } else {
        this._Foods.favorite(this.food.slug).then(
          () => {
            this.isSubmitting = false;
            this.food.favorited = true;
            this.food.favoritesCount++;
          }
        )
      }
  
    }
  
  }
  
  let FavoriteFoodBtn= {
    bindings: {
      food: '='
    },
    transclude: true,
    controller: FavoriteFoodBtnCtrl,
    templateUrl: 'components/buttons/favorite-food-btn.html'
  };
  
  export default FavoriteFoodBtn;
  