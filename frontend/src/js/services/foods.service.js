export default class Foods {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }
  
    query(config) {
      // Create the $http object for this request
      let request = {
        url: this._AppConstants.api + '/foods' + ((config.type === 'feed') ? '/feed' : ''),
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }



    // Get all foods
    getFoods() {
      return this._$http({
        url: this._AppConstants.api + '/foods',
        method: 'GET'
      }).then((res) => res.data.foods);
    }
    


    // Get one food(details)
    getFood(slug) {
      return this._$http({
        url: this._AppConstants.api + "/foods/" + slug,
        method: "GET"
      })
        .then(res => res.data.food);
    }



    // Obtain categories(difficulty of food recipe)
    getDifficulty() {
      return this._$http({
        url: this._AppConstants.api + "/foods/food/difficulty",
        method: "GET"
      }).then(res => res.data.difficulty);
    }
  




    // getFood(slug) {
    //   let deferred = this._$q.defer();
  
    //   if (!slug.replace(" ", "")) {
    //     deferred.reject("Article slug is empty");
    //     return deferred.promise;
    //   }
  
    //   this._$http({
    //     url: this._AppConstants.api + '/articles/' + slug,
    //     method: 'GET'
    //   }).then(
    //     (res) => deferred.resolve(res.data.article),
    //     (err) => deferred.reject(err)
    //   );
  
    //   return deferred.promise;
    // }

   
    // Delete a food
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/foods/' + slug,
        method: 'DELETE'
      })
    }
  



    // Create a food
    save(food) {
      let request = {};
  
      if (food.slug) {
        request.url = `${this._AppConstants.api}/foods/${food.slug}`;
        request.method = 'PUT';
        delete food.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/foods/`;
        request.method = 'POST';
      }
  
      request.data = { food: food };
  
      return this._$http(request).then((res) => res.data.food);
    }
  



  // Favorite and unfavorite
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/foods/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/foods/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  