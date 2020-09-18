export default class Categories {
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
        url: this._AppConstants.api + '/categories' + ((config.type === 'feed') ? '/feed' : ''),
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    } */

    getCategories() {
      return this._$http({
        url: this._AppConstants.api + "/categories",
        method: "GET",
      }).then(res => {
        return res.data.categories;
      })
    }
  
    getCategory(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Category slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/categories/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.category),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/categories/' + slug,
        method: 'DELETE'
      })
    }
  
    save(category) {
      let request = {};
  
      if (category.slug) {
        request.url = `${this._AppConstants.api}/categories/${category.slug}`;
        request.method = 'PUT';
        delete category.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/categories`;
        request.method = 'POST';
      }
  
      request.data = { category: category };
  
      return this._$http(request).then((res) => res.data.category);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/categories/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/categories/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  