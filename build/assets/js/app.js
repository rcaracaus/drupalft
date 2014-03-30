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
  controller('AppCtrl', function ($scope, $http) {

  });