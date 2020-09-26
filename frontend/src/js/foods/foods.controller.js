class FoodsCtrl {
    constructor(foods, $state, $scope) {
      'ngInject';
      this.foods = foods;
      console.log(this.foods);
      $scope.foods = this.foods;
  
      $scope.foodDetails = function () {
        $state.go("app.detailsFood", { slug: this.food.slug });
      };
    }
  }
  
  export default FoodsCtrl;
  