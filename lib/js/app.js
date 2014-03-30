angular

    .module("dft", [
        "ngRoute",
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
                    routeName: "index"
                }).when("/asdf", {
                    templateUrl: "/partials/partial1.html",
                    routeName: "asdf"
                })
                // Add further routes here
            ;
        }
    ])
;
