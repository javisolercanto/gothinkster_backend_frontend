export default class Movies {
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
        url: this._AppConstants.api + '/movies' + ((config.type === 'feed') ? '/feed' : ''),
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    } */

    getMovies() {
      return this._$http({
        url: this._AppConstants.api + "/movies",
        method: "GET",
      }).then(res => {
        return res.data.movies;
      })
    }
  
    getMovie(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Movie slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/movies/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.movie),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/movies/' + slug,
        method: 'DELETE'
      })
    }
  
    save(movie) {
      let request = {};
  
      if (movie.slug) {
        request.url = `${this._AppConstants.api}/movies/${movie.slug}`;
        request.method = 'PUT';
        delete movie.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/movies`;
        request.method = 'POST';
      }
  
      request.data = { movie: movie };
  
      return this._$http(request).then((res) => res.data.movie);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/movies/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/movies/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  