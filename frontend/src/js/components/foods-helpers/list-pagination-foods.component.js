class ListPaginationFoodsCtrl {
    constructor($scope) {
      'ngInject';
  
      this._$scope = $scope;
  
    }
  
    pageRange(total) {
      let pages = [];
  
      for (var i = 0; i < total; i++) {
        pages.push(i + 1)
      }
  
      return pages;
    }
  
    changePage(number) {
      this._$scope.$emit('setPageTo', number);
    }
  
  
  }
  
  let ListPaginationFoods= {
    bindings: {
      totalPages: '=',
      currentPage: '='
    },
    controller: ListPaginationFoodsCtrl,
    templateUrl: 'components/foods-helpers/list-pagination-foods.html'
  };
  
  export default ListPaginationFoods;
  