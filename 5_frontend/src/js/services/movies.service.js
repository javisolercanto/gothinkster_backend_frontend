export default class Movies {

  constructor(AppConstants, $http, $q, GraphQLClient) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._GQL = GraphQLClient;
  }

  query(config) {
    console.log(config);
    if (!config.filters.offset) {
      config.filters.offset = 0;
    }
    if (!config.filters.limit) {
      config.filters.limit = 4;
    }
    let query = `
      query {
        moviesConfig(limit:${config.filters.limit},offset:${config.filters.offset}, type:"${config.type}", userid:"${config.user.id}") {
          id
          slug
          title
          releaseYear
          director
          duration
          favoritesCount
          author {
            username
            image
          }
        }
        moviesCount
      }
    `;
    return this._GQL.get(query, this._AppConstants.gql + "/graphql");
    let request = {
      url: this._AppConstants.api + '/movies' + ((config.type === 'feed') ? '/feed' : ''),
      method: 'GET',
      params: config.filters ? config.filters : null
    };
    /* return this._$http(request).then((res) => res.data); */
    return this.getMovies();
  }

  getMovies () {
    let query = `
      query {
        movies {
          id
          slug
          title
          releaseYear
          director
          duration
          favoritesCount
          author {
            username
            image
          }
        }
      }
    `;
    return this._GQL.get(query, this._AppConstants.gql + "/graphql");
  }

  getMovie(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Movie slug is empty");
      return deferred.promise;
    }

    let query = `
      query {
        movie (slug: "${slug}") {
          id
          slug
          title
          releaseYear
          director
          duration
          favoritesCount
          author {
            username
            image
          }
        }
      }
    `;
    return this._GQL.get(query, this._AppConstants.gql + "/graphql");
  }

  destroy(slug) {
    return this._$http({
      url: this._AppConstants.api + '/movies/' + slug,
      method: 'DELETE'
    })
  }

  saveGQL(movie) {

    let query = `
      mutation createMovie {
        createMovie(input:{
          title: "${movie.title}",
          director: "${movie.director}",
          duration: "${movie.duration}",
          releaseYear: ${movie.releaseYear},
          author: "${movie.author.id}"
        }) {
          id
          title
          slug
        }
      }`

    return this._GQL.mutate(query, this._AppConstants.gql + "/graphql");
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
