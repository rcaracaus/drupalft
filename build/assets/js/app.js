var dft = angular

    .module("dft", [
      "ngRoute",
      "ngSanitize",
      'dft.controllers',
      "restangular",
      "xeditable"
    ])

    .config([

        "$routeProvider",
        "$locationProvider",
        "RestangularProvider",

        function ($routeProvider, $locationProvider, RestangularProvider) {

            $locationProvider.html5Mode(true);

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });

            
            RestangularProvider.setBaseUrl('http://d8contentdev.devcloud.acquia-sites.com/');

            RestangularProvider.setDefaultHeaders({ 'Accept': 'application/hal+json' });
            
            

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/recipes.html",
                    routeName: "index",
                    controller: 'recipesCtrl'
                })
                .when('/node/:id', {
                    templateUrl: '/partials/node.html',
                    controller: 'nodesCtrl'
                })
                // Add further routes here
            ;  
        }
    ])
    
    .factory('Page', function(){
      var title = 'default';
      return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
      };
    });
;




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
    Restangular.all('recipes').getList().then(function(recipes) {
      console.log(recipes);
       $scope.recipes = recipes;
    });
  })
  ;