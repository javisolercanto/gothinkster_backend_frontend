class SerieActionsCtrl {
  constructor(Series, User, $scope, $state) {
    'ngInject';

    this._Series = Series;
    this._$state = $state;
    /**
     * Recogemos el usuario actual para saber si puede modificar esta serie
     * lo debemos realizar en un onInit porque "serie" le llega a través de 
     * binding y por ello viene más lento que el constructor.
     */
    this.$onInit = () => {
      if (User.current) {
        this.canModify = (User.current.username === this.serie.author.username);
      } else this.canModify = false
    }

  }

  /**
   * Para eliminar la serie solo debemos saber su id (this.serie.slug), ahora
   * solo debemos llamar al servicio de "Serie" y a su método "destroy" que nos
   * permite ejecutar la ruta "DELETE" en el backend para eliminarla de la base
   * de datos. Una vez se haya borrado con éxito, redirigimos a la ruta "series"
   * para poder seguir navegando.
   */
  deleteSerie() {
    this.isDeleting = true;
    this._Series.destroy(this.serie.slug).then(
      (success) => this._$state.go('app.series'),
      (err) => this._$state.go('app.series')
    )
  }
}

/**
 * Recibimos la serie por binding
 */
let SerieActions = {
  bindings: {
    serie: '='
  },
  controller: SerieActionsCtrl,
  templateUrl: 'serie/serie-actions.html'
};

export default SerieActions;
