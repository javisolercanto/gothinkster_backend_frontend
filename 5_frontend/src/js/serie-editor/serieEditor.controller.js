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
        image: ''
      }
    } else {
      this.serie = serie;
    }

  }

  /* addTag() {
    if (!this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.article.tagList = this.article.tagList.filter((slug) => slug != tagName);
  } */

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
