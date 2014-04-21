var dft = angular

    .module("dft", [
      "ngRoute",
      "ngSanitize",
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

            
            RestangularProvider.setBaseUrl('http://d8contentdev.devcloud.acquia-sites.com/');

            RestangularProvider.setDefaultHeaders({ 'Accept': 'application/hal+json' });
            
            

            $routeProvider
                .when("/", {
                    templateUrl: "/partials/recipes.html",
                    routeName: "index",
                    controller: 'recipesCtrl'
                })
                .when('/node/:id', {
                    templateUrl: '/partials/node.html',
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
    })

  ;
;



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



