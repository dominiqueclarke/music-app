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
import savedShows from "./layout/savedShows.html";

//services
import userService from "./services/userService.js"
import musicService from "./services/musicService.js"
import musicPlayerService from "./services/musicPlayerService.js"
import musicTimerService from "./services/musicTimerService.js"
import showsService from "./services/showsService.js"
import mapService from "./services/mapService.js"
import videoMaskService from "./services/videoMaskService.js"

//directives
import show from "./components/show.js";
import loader from "./components/loader.js"

//Controlers
import showsCtrl from "./layout/showsCtrl.js";
import loginCtrl from "./layout/loginCtrl.js";

//components
import "./components/heroVideo.js";
//import desaturation from "./components/desaturation";

angular.module('music', [uiRouter, angularMaterialize])
  .service('userService', userService)
  .service('musicService', musicService)
  .service('musicTimerService', musicTimerService)
  .service('musicPlayerService', musicPlayerService)
  .service('showsService', showsService)
  .service('mapService', mapService)
  .service('videoMaskService', videoMaskService)
  .directive('show', show)
  .directive('loader', loader)
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
      .state('shows', {
        url: "/shows"
        , template: shows
        , controller: showsCtrl
        , controllerAs: 'vm'
        //, params: {zip: null, places: null, activities: null, geoData: null, rating: null}
      })
      .state('savedShows', {
        url: "/saved-shows"
        , template: savedShows
        // , controller: savedShowsCtrl
        // , controllerAs: 'vm'
        //, params: {zip: null, places: null, activities: null, geoData: null, rating: null}
      })
  })
