class FilterFoodsCtrl {
    constructor(foods, $state, $scope, $stateParams) {
      "ngInject";
  
      this._$scope = $scope;
  
      this.foods=foods;
  
      this.filter = $stateParams.filter;
     
  
      var filteredFoods = new Array();
      this.foods.forEach(food => {
        if (food.category == this.filter) {
          filteredFoods.push(food);
        }
      });
      this.filteredFoods = filteredFoods;
    }
  }
  
  export default FilterFoodsCtrl;
  