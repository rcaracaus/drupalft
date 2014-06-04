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



