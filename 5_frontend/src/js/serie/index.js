import angular from 'angular';

// Create the module where our functionality can attach to
let serieModule = angular.module('app.serie', []);

// Include our UI-Router config settings
import SerieConfig from './serie.config';
serieModule.config(SerieConfig);

// Controllers
import SerieCtrl from './serie.controller';
serieModule.controller('SerieCtrl', SerieCtrl);

import SeriesCtrl from './series.controller';
serieModule.controller('SeriesCtrl', SeriesCtrl);

// Components

import SerieActions from './serie-actions.component';
serieModule.component('serieActions', SerieActions);

import Review from './review.component';
serieModule.component('review', Review);

export default serieModule;
