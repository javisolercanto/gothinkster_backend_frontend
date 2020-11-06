import angular from 'angular';

// Create the module where our functionality can attach to
let movieEditorModule = angular.module('app.movieEditor', []);

// Include our UI-Router config settings
import MovieEditorConfig from './movieEditor.config';
movieEditorModule.config(MovieEditorConfig);


// Controllers
import MovieEditorCtrl from './movieEditor.controller';
movieEditorModule.controller('MovieEditorCtrl', MovieEditorCtrl);


export default movieEditorModule;
