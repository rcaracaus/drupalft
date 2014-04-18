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

            $locationProvider.html5Mode(true);

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });
            
            
            
            RestangularProvider.setBaseUrl('http://d8-content.local/');
            RestangularProvider.setDefaultHeaders({ 'Accept': 'application/hal+json' });
            
            

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/recipes.html",
                    routeName: "index",
                    controller: 'recipesCtrl'
                })
                .when('/node/:id', {
                    templateUrl: '/partials/partial2.html', 
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



