'use strict'

var client = angular.module('client', []).
  config(function($routeProvider, $httpProvider) {
    // allow cross domain since front and backend may be split up
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
    // routes
    $routeProvider.
      when(
        '/note',
        { templateUrl: 'static/partials/note.html'
        , controller: NoteCtrl }).
      when(
        '/link',
        { templateUrl: 'static/partials/link.html'
        , controller: LinkCtrl }).
      otherwise({redirectTo: "/"});
  });

// YOUR HINK BACKEND'S URL
var url = 'http://10.21.14.40:8080/'

function NoteCtrl($scope, $http) {
  // functionality for client controller to hink backend
  // initialize type list
  //getters (probably a better way to do these or avoid these)
  var type = 'note'
  $scope.get_categories= function(type) {
    $http.get(url + type).success(function(docs) {
      $scope.type = type
      $scope.categories = docs
    })
  }
  $scope.get_results = function(type, cat) {
    $http.get(url + type + '/' + cat).success(function(docs) {
      $scope.type = type
      $scope.cat = cat
      $scope.results = docs
    })
  }
  // global search url.com/search/:query
  $scope.globalSearch = function(searchText) {
    //XXX: This is not throttled
    $http.get(url + 'search/' + searchText).success(function(docs) {
      $scope.results = docs
    })
  }

}
function LinkCtrl($scope, $http) {
  var type = 'link'
  $scope.get_categories= function(type) {
    $http.get(url + type).success(function(docs) {
      $scope.type = type
      $scope.categories = docs
    })
  }
  $scope.get_results = function(type, cat) {
    $http.get(url + type + '/' + cat).success(function(docs) {
      $scope.type = type
      $scope.cat = cat
      $scope.results = docs
    })
  }
}

