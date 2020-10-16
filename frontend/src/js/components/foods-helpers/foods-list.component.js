class FoodsListCtrl {

    constructor(Foods, $scope, $state){
      "ngInject";
  
      this._$scope = $scope;
      this._Foods = Foods;

      this.$onInit = function() {
        this.setLimit(this.limit);
        this.setListTo(this.listConfig);
      };

      $scope.$on('setListTo', (ev, newList) => {
        this.setListTo(newList);
      });
  
      $scope.$on('setPageTo', (ev, pageNumber) => {
        this.setPageTo(pageNumber);
      });

    }

    setLimit(limit){
      this.limit = limit;
      console.log(this.limit);
    }

    setListTo(newList) {
      // Set the current list to an empty array
      this.list = [];
  
      // Set listConfig to the new list's config
      this.listConfig = newList;
  
      this.runQuery();
    }
  
    setPageTo(pageNumber) {
      this.listConfig.currentPage = pageNumber;
  
      this.runQuery();
    }


    runQuery() {
      // Show the loading indicator
      this.loading = true;
      this.listConfig = this.listConfig || {};
  
      // Create an object for this query
      let queryConfig = {
        type: this.listConfig.type || undefined,
        filters: this.listConfig.filters || {}
      };
  
      // Set the limit filter from the component's attribute
      queryConfig.filters.limit = this.limit;
  
      // If there is no page set, set page as 1
      if (!this.listConfig.currentPage) {
        this.listConfig.currentPage = 1;
      }
  
      // Add the offset filter
      queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
  
      // Run the query
      this._Foods
        .query(queryConfig)
        .then(
          (res) => {
            console.log(res);
            this.loading = false;
  
            // Update list and total pages
            this.list = res.foods;
  
            this.listConfig.totalPages = Math.ceil(res.foodsCount / this.limit);
          }
        );
    }

  }
  

  let FoodsList = {
    bindings: {
      limit: '=',
      listConfig: '='
    },
    controller: FoodsListCtrl,
    templateUrl: 'components/foods-helpers/foods-list.html'
  };

  export default FoodsList;
  