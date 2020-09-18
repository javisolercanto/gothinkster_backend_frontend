export default class Series {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      
    }
  
    /*
      Config object spec:
  
      {
        type: String [REQUIRED] - Accepts "all", "feed"
        filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
      }
    */
    /* query(config) {
      // Create the $http object for this request
      let request = {
        url: this._AppConstants.api + '/series' + ((config.type === 'feed') ? '/feed' : ''),
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    } */

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
  