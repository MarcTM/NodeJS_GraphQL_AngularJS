class FoodActionsCtrl {
    constructor(Foods, User, $state) {
      'ngInject';
    
        this._Foods = Foods;
        this._$state = $state;
  
        this.$onInit = () => {
          if (User.current) {
            this.canModify = (User.current.username === this.food.author.username);
          } else {
            this.canModify = false;
          }
        }
    }
  
    deleteRecipe() {
      this.isDeleting = true;
      this._Foods.destroy(this.food.slug).then(
        (success) => this._$state.go('app.foods'),
        (err) => this._$state.go('app.home')
      )
    }
  }
  
  let FoodActions = {
    bindings: {
      food: '='
    },
    controller: FoodActionsCtrl,
    templateUrl: 'components/foods-helpers/food-actions.html'
  };
  
  export default FoodActions;
  