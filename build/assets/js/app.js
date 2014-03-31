
var dft = angular

    .module("dft", [
        "ngRoute",
        'dft.controllers',
        "restangular"
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

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/partial1.html",
                    routeName: "index",
                    controller: 'nodeCtrl'
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
    .config(["RestangularProvider",function(RestangularProvider){
      	RestangularProvider.setBaseUrl('http://d8contentdev.devcloud.acquia-sites.com/');
      	RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
      	


        RestangularProvider.setResponseExtractor(function(response) {
          var newResponse = response;
          if (angular.isArray(response)) {
            angular.forEach(newResponse, function(value, key) {
              newResponse[key].originalElement = angular.copy(value);
            });
          } else {
            newResponse.originalElement = angular.copy(response);
          }

          return newResponse;
        });
      }])
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