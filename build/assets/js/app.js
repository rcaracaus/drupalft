



var dft = angular

    .module("dft", [
        "ngRoute",
        'dft.controllers',
        "restangular",
        "xeditable"
    ])

    .config([

        "$routeProvider",
        "$locationProvider",
        "RestangularProvider",

        function ($routeProvider, $locationProvider, RestangularProvider) {

            "use strict";
            
                 

            $locationProvider.html5Mode(true);

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });
            
            
            
            RestangularProvider.setBaseUrl('http://d8-content.local/');
            RestangularProvider.setDefaultHeaders({ 'Accept': 'application/hal+json' });
            
            

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/partial1.html",
                    routeName: "index",
                    controller: 'indexCtrl'
                })
                .when('/node/:id', {
                    templateUrl: '/partials/partial2.html', 
                    controller: 'nodesCtrl'
                })
                .when('/frontpage', {
                    templateUrl: '/partials/frontpage.html', 
                    controller: 'frontpageCtrl'
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

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  });

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });

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