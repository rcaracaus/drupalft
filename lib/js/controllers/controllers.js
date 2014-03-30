'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  controller('nodeCtrl', function ($scope, $http) {
     $scope.test = "testString";
     console.log($scope);
  }).
  controller('nodesCtrl', function ($scope, $http) {
     $scope.test = "nodesString";
     console.log($scope);
  });