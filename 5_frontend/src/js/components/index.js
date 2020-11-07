import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import RateBtn from './buttons/rate-btn.component';
componentsModule.component('rateBtn', RateBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import SeriesList from './series-helpers/series-list.component';
componentsModule.component('seriesList', SeriesList);

import SeriePreview from './series-helpers/serie-preview.component';
componentsModule.component('seriePreview', SeriePreview);

import SerieMeta from './series-helpers/serie-meta.component';
componentsModule.component('serieMeta', SerieMeta);

import SerieFilters from './series-helpers/serie-filters.component';
componentsModule.component('serieFilters', SerieFilters);

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

import SerieListPagination from './series-helpers/serie-list-pagination.component';
componentsModule.component('serieListPagination', SerieListPagination);

import MoviesList from './movies-helpers/movies-list.component';
componentsModule.component('moviesList', MoviesList);

import MoviePreview from './movies-helpers/movie-preview.component';
componentsModule.component('moviePreview',  MoviePreview);

import MovieMeta from './movies-helpers/movie-meta.component';
componentsModule.component('movieMeta', MovieMeta);

import MovieListPagination from './movies-helpers/movie-list-pagination.component';
componentsModule.component('movieListPagination', MovieListPagination);

import HomeSlider from './home-helpers/home-slider.component';
componentsModule.component('homeSlider', HomeSlider);

export default componentsModule;
