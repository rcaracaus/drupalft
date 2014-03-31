'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  controller('nodeCtrl', function ($scope, $http) {
     $scope.test = "testString";
     
  }).
  controller('nodesCtrl', function ($scope, $routeParams, $location, Restangular) {
     Restangular.one('node', $routeParams.id).get().then(function(node){
        $scope.node = node;
        
      });
  }).
  controller('frontpageCtrl', function ($scope, $location, Restangular) {
     var resource = Restangular.one('api/views', 'frontpage');
     resource.getList().then(function(frontpage){
       // Had to do some work with Restangular settings to get it so object was derestangularized
       // https://github.com/mgonto/restangular#how-can-i-access-the-unrestangularized-element-as-well-as-the-restangularized-one
       console.log(frontpage);
       $scope.frontpage = frontpage;
     });
  })
  ;