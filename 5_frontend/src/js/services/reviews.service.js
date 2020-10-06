export default class Reviews {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
  }


  // Add a review to a serie
  add(slug, payload) {
    return this._$http({
      url: `${this._AppConstants.api}/series/${slug}/reviews`,
      method: 'POST',
      data: { review: { body: payload } }
    }).then((res) => res.data.review);

  }

  getAll(slug) {
    let deferred = this._$q.defer();

    this._$http({
      url: this._AppConstants.api + "/series/" + slug + "/reviews",
      method: 'GET',
    }).then(
      (res) => deferred.resolve(res.data.reviews),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  destroy(reviewId, serieSlug) {
    return this._$http({
      url: `${this._AppConstants.api}/series/${serieSlug}/reviews/${reviewId}`,
      method: 'DELETE',
    });
  }

}
