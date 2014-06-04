var dft = angular

    .module("dft", [
      "ngRoute",
      "ngSanitize",
      'dft.controllers',
      "xeditable"
    ])

    .config([

        "$routeProvider",
        "$locationProvider",

        function ($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/recipes.html",
                    routeName: "index",
                    controller: 'recipesCtrl'
                })
                .when('/node/:nid', {
                    templateUrl: '/partials/node.html',
                    controller: 'nodesCtrl'
                })
                .when('/submit-a-recipe', {
                    templateUrl: '/partials/submit.html',
                    controller: 'submitCtrl'
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
    })

  ;
;

dft.config(function($httpProvider){
    // Needed to connect to Drupal site.
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // Set Accept header to hal+json to comply with Drupal GET
    $httpProvider.defaults.headers.common['Accept'] = 'application/hal+json';
});



var removeDuplicatesInPlace = function (arr) {
  var i, j, cur, found;
  for (i = arr.length - 1; i >= 0; i--) {
    cur = arr[i];
    found = false;
    for (j = i - 1; !found && j >= 0; j--) {
      if (cur === arr[j]) {
        if (i !== j) {
          arr.splice(i, 1);
        }
        found = true;
      }
    }
  }
  return arr;
};




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