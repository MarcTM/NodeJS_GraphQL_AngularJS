class FoodsCtrl {
    constructor(foods, Tags, User, $state, $scope) {
      'ngInject';

      this.foods = foods;
      this._$scope = $scope;
      console.log(this.foods);

      // Get list of all tags
      Tags.getAll().then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );


      // Set current list to either feed or all, depending on auth status.
      this.listConfig = {
        type: 'all'
      };
      console.log(this.listConfig);

    }


    changeList(newList) {
      this._$scope.$broadcast('setListTo', newList);
    }


}
  
export default FoodsCtrl;
  