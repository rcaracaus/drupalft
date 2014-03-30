angular

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
                    templateUrl: "/templates/index.html",
                    routeName: "index",
                    controller: 'nodeCtrl'
                }).when("/asdf", {
                    templateUrl: "/partials/partial1.html",
                    controller: 'nodeCtrl'
                })
                // Add further routes here
            ;
        }
    ])
;
