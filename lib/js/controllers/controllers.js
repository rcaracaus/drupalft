'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  
  controller('MainCtrl', function ($scope, $http, Page) {
     $scope.Page = Page;
  }).
  controller('indexCtrl', function ($scope, Page) {
     Page.setTitle('Angular app');
     $scope.test = 'testing';
  }).
  controller('nodesCtrl', function ($scope, $routeParams, $location, Restangular) {
     Restangular.one('node', $routeParams.id).get().then(function(node){
        $scope.node = node;
        
      });
  }).
  controller('blockCtrl', function ($scope, $http) {
  
     
     data = { 
      "_links":{
        "type":{
           "href":"http://d8-content.local/rest/type/node/page"
         }
       },
     "title":[{"value":"This title should data"}]
     }
     
     
     
     $http({
         url: 'http://d8-content.local/node/63',
         method: "GET",
         data: data,
         headers: {
           'Content-Type':'application/hal+json',
           'Accept':'application/hal+json'
           }
     }).then(function(response) {
            // Had to hack Drupal Core to get POST response coming back.
            // Had to hack Drupal again to get image response back.
            $scope.node = response.data;
            $scope.node.field_image = response.data._embedded['http://d8-content.local/rest/relation/node/page/field_image'][0].uri[0].value;
            
         }, 
         function(response) { // optional
             // failed
         }
     );
     
     
     
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