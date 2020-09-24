import angular from 'angular';

// Create the module where our functionality can attach to
let authModule = angular.module('app.auth', []);
let socialModule = angular.module('app.socialLogin', []);

// Include our UI-Router config settings
import AuthConfig from './auth.config';
authModule.config(AuthConfig);

// Include controllers
import AuthCtrl from './auth.controller';
authModule.controller('AuthCtrl', AuthCtrl);

import SocialCtrl from './social.controller';
socialModule.controller('SocialCtrl', SocialCtrl);



export default authModule;
