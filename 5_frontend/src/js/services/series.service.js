export default class Series {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      
    }

    getSeries() {
      return this._$http({
        url: this._AppConstants.api + "/series",
        method: "GET",
      }).then(res => {
        return res.data.series;
      })
    }
  
    getSerie(slug) {
      let deferred = this._$q.defer();

      if (!slug.replace(" ", "")) {
        deferred.reject("Serie slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/series/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.serie),
        (err) => deferred.reject(err)
      );

      return deferred.promise;
    }

    getCategories() {
      let deferred = this._$q.defer();
  
      this._$http({
        url: this._AppConstants.api + '/series/categories/',
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.categories),
        (err) => deferred.reject(err)
      );

      return deferred.promise;
    }

    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/series/' + slug,
        method: 'DELETE'
      })
    }
  
    save(serie) {
      let request = {};
  
      if (serie.slug) {
        request.url = `${this._AppConstants.api}/series/${serie.slug}`;
        request.method = 'PUT';
        delete serie.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/series`;
        request.method = 'POST';
      }
  
      request.data = { serie: serie };
  
      return this._$http(request).then((res) => res.data.serie);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/series/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/series/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  }
  