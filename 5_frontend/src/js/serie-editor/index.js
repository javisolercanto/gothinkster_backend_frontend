import angular from 'angular';

// Create the module where our functionality can attach to
let serieEditorModule = angular.module('app.serieEditor', []);

// Include our UI-Router config settings
import SerieEditorConfig from './serieEditor.config';
serieEditorModule.config(SerieEditorConfig);


// Controllers
import SerieEditorCtrl from './serieEditor.controller';
serieEditorModule.controller('SerieEditorCtrl', SerieEditorCtrl);


export default serieEditorModule;
