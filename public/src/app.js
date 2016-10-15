//jquery
import $ from "jquery";

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
import showsService from "./services/showsService.js"
import mapService from "./services/mapService.js"

//directives
import show from "./components/show.js";

//Controlers
import showsCtrl from "./layout/showsCtrl.js";
import loginCtrl from "./layout/loginCtrl.js";

//components
import heroVideo from "./components/heroVideo.js";
//import desaturation from "./components/desaturation";

angular.module('music', [uiRouter, angularMaterialize])
  .service('userService', userService)
  .service('musicService', musicService)
  .service('showsService', showsService)
  .service('mapService', mapService)
  .directive('show', show)
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: '/'
        , template: login
        , controller: loginCtrl
        , controllerAs: 'vm'
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
