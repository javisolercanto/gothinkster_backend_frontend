class MovieEditorCtrl {
  constructor(User, Movies, movie, $state) {
    'ngInject';

    this._Movies = Movies;
    this._User = User;
    this._$state = $state;

    if (!movie) {
      this.movie = {
        title: '',
        director: '',
        releaseYear: '',
        duration: '',
      }
    } else {
      this.movie = movie;
    }

  }

  submit() {
    this.isSubmitting = true;

    let author = this._User.getCurrent();
    if (author) {
      console.log(author);
      this.movie.author = author.id;

      this._Movies.saveGQL(this.movie).then(
        (newMovie) => {
          this._$state.go('app.movie', { slug: newMovie.slug });
        },
  
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
        }
      )
    }
  }
}


export default MovieEditorCtrl;
