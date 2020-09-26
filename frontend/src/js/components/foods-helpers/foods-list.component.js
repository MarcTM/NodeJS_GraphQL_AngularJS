class FoodsListCtrl {

    constructor($scope, $state){
      "ngInject";
  
      this._$scope = $scope;
    }
  }
  

  let FoodsList = {
    bindings: {
      foods: '='
    },
    controller: FoodsListCtrl,
    templateUrl: 'components/foods-helpers/foods-list.html'
  };

  export default FoodsList;
  