
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

