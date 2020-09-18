import angular from 'angular';

// Create the module where our functionality can attach to
let serieModule = angular.module('app.serie', []);
let detailsSerieModule = angular.module('app.detailsSerie', []);

// Include our UI-Router config settings
import SerieConfig from './serie.config';
serieModule.config(SerieConfig);

// Controllers
import SerieCtrl from './serie.controller';
serieModule.controller('SerieCtrl', SerieCtrl);

import DetailsSerieCtrl from './serieDetails.controller';
detailsSerieModule.controller('DetailsSerieCtrl', DetailsSerieCtrl);

/* import ArticleActions from './serie-actions.component';
serieModule.component('serieActions', ArticleActions); */

/* import Comment from './comment.component'; */
/* serieModule.component('comment', Comment); */


export default serieModule;
