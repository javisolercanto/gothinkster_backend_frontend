import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import MoviesService from './movies.service';
servicesModule.service('Movies', MoviesService);

import SeriesService from './series.service';
servicesModule.service('Series', SeriesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import Toastr from './toastr.service';
servicesModule.service('Toastr', Toastr);


export default servicesModule;
