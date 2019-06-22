var myApp = angular.module('myApp', []);
myApp.controller('aplCtrl', ['$scope', '$http', function($scope, $http){
    // get data
    $http.get('data/aplications.json').then(function(response){
        $scope.aplications = response.data;
    })

    // sort data
    $scope.order = 'id_apl';
    $scope.reverse = false;
    $scope.sortBy = function(order) {
        $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
        $scope.order = order;
    };
    
    // search data
    $scope.search = '';
    $scope.filterBy = function(person) {
        return (person.id_apl + person.email + person.first_name.toLowerCase() + person.last_name.toLowerCase() + person.create_time + person.update_time + person.comment.toLowerCase()).indexOf($scope.search.toLowerCase()) > -1;
    };
}]);
