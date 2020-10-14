class SerieEditorCtrl {
  constructor(Series, serie, $state) {
    'ngInject';

    this._Series = Series;
    this._$state = $state;

    if (!serie) {
      this.serie = {
        title: '',
        seasons: '',
        category: '',
        image: '',
        tagList: []
      }
    } else {
      this.serie = serie;
    }

  }

  addTag() {
    if (!this.serie.tagList.includes(this.tagField)) {
      this.serie.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.serie.tagList = this.serie.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._Series.save(this.serie).then(
      (newSerie) => {
        this._$state.go('app.serie', { slug: newSerie.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}


export default SerieEditorCtrl;
