class FoodsListCtrl {

    constructor($scope, $state, Toastr){
      "ngInject";
  
      this._$scope = $scope;
      this._toastr = Toastr;

      this.errToas = function () {
        Toastr.showToastr("error", "Error example");
      };
      this.succToas = function () {
        Toastr.showToastr("success", "Success example");
      };
      this.infoToas = function () {
        Toastr.showToastr("info", "Info example");
      };
      this.warnToas = function () {
        Toastr.showToastr("warning", "Warning example");
      };
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
  