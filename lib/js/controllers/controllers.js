'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  controller('nodeCtrl', function ($scope, $http) {
     $scope.test = "testString";
     
  }).
  controller('nodesCtrl', function ($scope, $routeParams, $location, Restangular) {
     
     Restangular.one('node', 1).get().then(function(node){
        $scope.node = node;
        console.log($scope.node);
      });

     
  });