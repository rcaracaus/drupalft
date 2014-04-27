'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  
  controller('MainCtrl', function ($scope, Page) {
     $scope.Page = Page;
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


    Restangular.all('recipes').getList().then(function(recipes) {
      $scope.recipes = recipes;

      var categories = [];
      $scope.recipes.forEach(function(recipe) {
        categories.push(recipe.term_node_tid);
      });
      categories = removeDuplicatesInPlace(categories);
      $scope.categories = categories;
      $scope.categories.unshift("all");
    });

    $scope.selected = 0;
    $scope.select= function($index) {
      $scope.selected = $index;
    };

    $scope.sendCategory = function(category) {
      $scope.searchTermText = category;
      if (category == 'all') {
        $scope.searchTermText  = ""
      }
    };


  })
  ;