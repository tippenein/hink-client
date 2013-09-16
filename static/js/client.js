'use strict'

var client = angular.module('client', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', { templateUrl: 'static/partials/main.html'
                , controller: ClientCtrl })
  });

client.config([$httpProvider, function($httpProvider) {
  $httpProvider.defaults.useXDomain = true
  delete $httpProvider.defaults.headers.common['X-Requested-With']
}])

function ClientCtrl($scope, $http) {
  // functionality for client controller to hink backend
  var url = 'http://127.0.0.1:3000/'
  // initialize type list
  $scope.init_types = function() {
    $http.get(url).success(function(docs) {
      $scope.types = docs
    })
  }
  //getters (probably a better way to do these or avoid these)
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
