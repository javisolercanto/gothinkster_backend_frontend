import angular from 'angular';

// Create the module where our functionality can attach to
let movieModule = angular.module('app.movie', []);

// Include our UI-Router config settings
import MovieConfig from './movie.config';
movieModule.config(MovieConfig);


// Controllers
import MovieCtrl from './movie.controller';
movieModule.controller('MovieCtrl', MovieCtrl);

/* import ArticleActions from './movie-actions.component';
movieModule.component('movieActions', ArticleActions); */

/* import Comment from './comment.component'; */
/* movieModule.component('comment', Comment); */


export default movieModule;
