'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  controller('nodeCtrl', function ($scope, $http) {
     $scope.test = "testString";
     console.log($scope);
  }).
  controller('nodesCtrl', function ($scope, $routeParams, $location) {
     console.log($routeParams);
  });