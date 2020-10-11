export default class Comments {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }


   // Add a comment to a recipe
   add(slug, payload) {
    return this._$http({
      url: `${this._AppConstants.api}/foods/${slug}/comments`,
      method: 'POST',
      data: { comment: { body: payload } }
    }).then((res) => res.data.comment);

  }

  // Get all recipe's comments
  getAll(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/foods/${slug}/comments`,
      method: 'GET',
    }).then((res) => res.data.comments);

  }

  // Delete recipe's comment
  destroy(commentId, foodSlug) {
    return this._$http({
      url: `${this._AppConstants.api}/foods/${foodSlug}/comments/${commentId}`,
      method: 'DELETE',
    });
  }

}
