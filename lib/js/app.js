
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
                // Add further routes here
            ;
        }
    ])
;

