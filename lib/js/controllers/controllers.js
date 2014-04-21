'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  
  controller('MainCtrl', function ($scope, $http, Page) {
     $scope.Page = Page;
     $scope.mainMenu = 'partials/main-menu.html';
  }).
  controller('nodesCtrl', function ($scope, $routeParams, $location, Restangular) {
     Restangular.one('node', $routeParams.id).get().then(function(node){
        $scope.node = node;
      });
  }).
  controller('blockCtrl', function ($scope, $http) {

      /*

     data = { 
      "_links":{
        "type":{
           "href":"http://d8-content.local/rest/type/node/page"
         }
       },
     "title":[{"value":"This title should data"}]
     }
     
     
    
     $http({
         url: 'http://d8-2.local/node/1',
         method: "POST",
         data: data,
         headers: {
           'Content-Type':'application/hal+json',
           'Accept':'application/hal+json'
           }
     }).then(function(response) {
            // Had to hack Drupal Core to get POST response coming back.
            // Had to hack Drupal again to get image response back.
            $scope.node = response.data;
            $scope.node.field_image = response.data._embedded['http://d8-.local/rest/relation/node/page/field_image'][0].uri[0].value;
            console.log('success');
         }, 
         function(response) { // optional
             // failed
         }
     );

     */
   
     
     
     
  }).
  controller('recipesCtrl', function ($scope, $location, Restangular, Page) {
    Page.setTitle("Recipes");
    $scope.categories = [
      {
        "name": "tacos"
      },
      {
        "name": "burrito"
      }
    ];

    $scope.categories.unshift({
      "name": "all"
    });

    $scope.selected = 0;
    $scope.select= function($index) {
      $scope.selected = $index;
    };

    $scope.sendCategory = function(category) {
      $scope.searchTermText = category.name;
      if (category.name == 'all') {
        $scope.searchTermText  = ""
      }
    };


    Restangular.all('recipes').getList().then(function(recipes) {
      console.log(recipes);
       $scope.recipes = recipes;
    });
  })
  ;