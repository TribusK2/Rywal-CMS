var myApp = angular.module('myApp', []);
myApp.controller('aplCtrl', ['$scope', '$http', function($scope, $http){
    // get data
    $http.get('data/aplications.json').then(function(response){
        $scope.aplications = response.data;
    })
    $scope.order = 'id_apl';
    $scope.reverse = false;
    $scope.sortBy = function(order) {
        $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
        $scope.order = order;
      };
}]);
