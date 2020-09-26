export default class Foods {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }
  
    // query(config) {
    //   // Create the $http object for this request
    //   let request = {
    //     url: this._AppConstants.api + '/articles' + ((config.type === 'feed') ? '/feed' : ''),
    //     method: 'GET',
    //     params: config.filters ? config.filters : null
    //   };
    //   return this._$http(request).then((res) => res.data);
    // }

    getFoods() {
      return this._$http({
        url: this._AppConstants.api + '/foods',
        method: 'GET'
      }).then((res) => res.data.foods);
    }
    

    getFood(slug) {
      return this._$http({
        url: this._AppConstants.api + "/foods/" + slug,
        method: "GET"
      })
        .then(res => res.data.food);
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

   
  
    // destroy(slug) {
    //   return this._$http({
    //     url: this._AppConstants.api + '/articles/' + slug,
    //     method: 'DELETE'
    //   })
    // }
  
    // save(article) {
    //   let request = {};
  
    //   if (article.slug) {
    //     request.url = `${this._AppConstants.api}/articles/${article.slug}`;
    //     request.method = 'PUT';
    //     delete article.slug;
  
    //   } else {
    //     request.url = `${this._AppConstants.api}/articles`;
    //     request.method = 'POST';
    //   }
  
    //   request.data = { article: article };
  
    //   return this._$http(request).then((res) => res.data.article);
    // }
  
  
    // favorite(slug) {
    //   return this._$http({
    //     url: this._AppConstants.api + '/articles/' + slug + '/favorite',
    //     method: 'POST'
    //   })
    // }
  
    // unfavorite(slug) {
    //   return this._$http({
    //     url: this._AppConstants.api + '/articles/' + slug + '/favorite',
    //     method: 'DELETE'
    //   })
    // }
  
  
  }
  