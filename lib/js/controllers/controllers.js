'use strict';

/* Controllers */

angular.module('dft.controllers', []).
  
  controller('MainCtrl', function ($scope, Page) {
     $scope.Page = Page;
  }).
  controller('submitCtrl', function ($scope, Page) {
        Page.setTitle("Submit a Recipe");
  }).
  controller('nodesCtrl', function ($scope, $routeParams, dftService,Page) {
    dftService.getNode($routeParams.nid, function(data) {
        $scope.node = data;
        Page.setTitle($scope.node.title[0].value);
    });
  }).
  controller('recipesCtrl', function (dftService, $scope, Page) {
    Page.setTitle("Recipes");


    dftService.getRecipes(function(data) {
        $scope.recipes = data;

        var categories = [];
        $scope.recipes.forEach(function(recipe) {
            categories.push(recipe.field_tags);
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


  }).
  controller('blocksCtrl', function ($scope, $http) {
    $http.get('http://d8contentdev.devcloud.acquia-sites.com/block_list/bartik/featured').then(function(response) {
        $scope.blocks = response.data;
            console.log($scope.blocks);
      }
    );

  })
;


// The service grabs the data from the json file.
dft.factory('dftService', function($http) {
    return {
        getNode: function(nid, callback) {
            $http.get('http://d8content-new.dev/node/' + nid).success(callback);
        },
        getRecipes: function(callback) {
            $http.get('http://d8content-new.dev/recipes').success(callback);
        }
    }
});