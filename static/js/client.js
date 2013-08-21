'use strict'

angular.module('client', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'static/partials/main.html', controller:ClientCtrl});
  });

function ClientCtrl($scope, $http) {
  // 
}
