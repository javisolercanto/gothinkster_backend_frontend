import angular from 'angular';

// Create the module where our functionality can attach to
let movieModule = angular.module('app.movie', []);

// Include our UI-Router config settings
import MovieConfig from './movie.config';
movieModule.config(MovieConfig);

// Controllers
import MovieCtrl from './movie.controller';
movieModule.controller('MovieCtrl', MovieCtrl);

import MoviesCtrl from './movies.controller';
movieModule.controller('MoviesCtrl', MoviesCtrl);

// Components

import MovieActions from './movie-actions.component';
movieModule.component('movieActions', MovieActions);

export default movieModule;
