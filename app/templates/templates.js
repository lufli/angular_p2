angular.module('myApp.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/templates', {
      templateUrl: 'templates/templates.html',
      controller: 'TemplatesCtrl'
    })
    .when('/templates/:templateId', {
      templateUrl: 'templates/template_detail.html',
      controller: 'TemplateDetailsCtrl'
    });
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('json/templates.json').success(function(response){
    $scope.templates = response;
  })
}])

.controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
  var templateId = $routeParams.templateId;
  console.log(templateId);
  $http.get('json/templates.json').success(function(response){
    $scope.template = $filter('filter')(response, function(d){
      return d.id == templateId;
    })[0];

  })
}])
