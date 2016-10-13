//Styles
import materializeCSS from "../sass/materialize.scss";

//node_modules
import angular from "angular";
import uiRouter from "angular-ui-router";
import angularMaterialize from 'angular-materialize';

//templates
import login from "./layout/login.html";
import shows from "./layout/shows.html";

//services
import userService from "./services/userService.js"
import musicService from "./services/musicService.js"

//directives
import show from "./components/show.js";

//Controlers
import showsCtrl from "./layout/showsCtrl";

angular.module('music', [uiRouter, angularMaterialize])
  .service('userService', userService)
  .service('musicService', musicService)
  .directive('show', show)
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: '/'
        , template: login
        //, templateUrl:
      })
      .state('results', {
        url: "/shows"
        , template: shows
        , controller: showsCtrl
        , controllerAs: 'vm'
        //, params: {zip: null, places: null, activities: null, geoData: null, rating: null}
      })
  })
