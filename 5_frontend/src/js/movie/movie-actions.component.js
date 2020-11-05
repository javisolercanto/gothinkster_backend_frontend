class MovieActionsCtrl {
  constructor(Movies, User, $state) {
    'ngInject';

    this._Movies = Movies;
    this._$state = $state;
    /**
     * Recogemos el usuario actual para saber si puede modificar esta movie
     * lo debemos realizar en un onInit porque "movie" le llega a través de 
     * binding y por ello viene más lento que el constructor.
     */
    this.$onInit = () => {
      if (User.current) {
        this.canModify = (User.current.username === this.movie.author.username);
      } else this.canModify = false
    }

  }

  /**
   * Para eliminar la movie solo debemos saber su id (this.movie.slug), ahora
   * solo debemos llamar al servicio de "Movie" y a su método "destroy" que nos
   * permite ejecutar la ruta "DELETE" en el backend para eliminarla de la base
   * de datos. Una vez se haya borrado con éxito, redirigimos a la ruta "movies"
   * para poder seguir navegando.
   */
  deleteMovie() {
    this.isDeleting = true;
    this._Movies.destroy(this.movie.slug).then(
      (success) => this._$state.go('app.movies'),
      (err) => this._$state.go('app.movies')
    )
  }
}

/**
 * Recibimos la movie por binding
 */
let MovieActions = {
  bindings: {
    movie: '='
  },
  controller: MovieActionsCtrl,
  templateUrl: 'movie/movie-actions.html'
};

export default MovieActions;
