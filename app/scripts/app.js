'use strict';

angular.module('itemsapi', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'checklist-model',
  'ngAnimate',
  'ui.router',
  'ui.router.util',
  'base64',
  'restangular',
  'directive.loading',
  'my-crud',
  'ui.bootstrap',
  'ngQuickDate',
  'geolocation',
  'ngOrderObjectBy',
  'ui.codemirror',
  'ui.bootstrap.datetimepicker'
])
//.constant('APP', {'baseUrl': 'http://localhost:3000/api/v1', 'suffix': '' })
.constant('APP', {'baseUrl': '/api/v1', 'suffix': '' })

.config(function (APP, RestangularProvider, $base64, $locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider) {

  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  RestangularProvider.setBaseUrl(APP.baseUrl);
  RestangularProvider.setRequestSuffix(APP.suffix);

  $urlRouterProvider.otherwise('/#');
  $locationProvider.html5Mode(false);

  console.log('I am in config');

  $stateProvider
  .state('public', { abstract: true,
         template: '<ui-view/>',
         data: {
           access: 'public'
         }
  })
  .state('public.404', {
    url: '/404/',
    templateUrl: '404'
  });

  $stateProvider
  .state('documents', {
    url: '/documents/name/:name?page&limit&query&sort&aggs',
    //url: urlMatcher,
    parent: 'abstract',
    controller: 'DocumentListController',
    templateUrl: 'views/document/list.html'
  })
  .state('abstract', {
    abstract: true,
    template: '<ui-view autoscroll="false" />',
    resolve: {
    },
    controller: 'GlobalCtrl'
  })
  .state('home', {
    url: '/',
    parent: 'abstract',
    controller: 'CollectionListController',
    templateUrl: 'views/collection/list.html'
  })
  .state('collections', {
    url: '/collections',
    parent: 'abstract',
    controller: 'CollectionListController',
    templateUrl: 'views/collection/list.html'
  })
}).
  run(function($window, Restangular, $modal, $q) {
  Restangular.setErrorInterceptor(function(data) {
    if (data.status == 401 || data.status == 403) {
      console.log('Authorization problems in run');
    }
    return data;
  });
});
