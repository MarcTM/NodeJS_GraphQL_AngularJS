class FoodsCtrl {
    constructor(foods, $state, $scope) {
      'ngInject';
      this.foods = foods;
      console.log(this.foods);
    }
}
  
export default FoodsCtrl;
  