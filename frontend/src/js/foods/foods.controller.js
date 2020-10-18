class FoodsCtrl {
    constructor(Tags, User, $state, $scope) {
      'ngInject';

      this._$scope = $scope;

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
  