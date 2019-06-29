var myApp = angular.module('myApp', []);
myApp.controller('aplCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    // get data
    $http.get('data/aplications.json').then(function(response){
        $scope.aplications = response.data;
    });

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

    // edit comment field
    $scope.edit = function(){
        $scope.title = 'Komentarz';
        $scope.comment = this.person.comment;
        var item = $filter('filter')($scope.aplications, {id_apl: this.person.id_apl})[0];
       
        $scope.save = function(){
            var editedComment = this.comment;
            item.comment = editedComment;
            // $http({
            //     method: "post",
            //     url: "data/aplications.json",
            //     data: $scope.myJsonObject,
            //     headers: { 'Content-Type': 'application/json; charset=utf-8' }
            // });
        };
    };
    // delete record
    $scope.delete = function(){
        var id = this.person.id_apl;
        $scope.aplications = $filter('filter')($scope.aplications, {id_apl: id},
             function(actual, expected){
                return actual !== expected;
             });
        // $scope.aplications.splice(item,1)
        // console.log(id);
        // console.log(item);
        // arrayRemove($scope.aplications, item);
    };

    // add record
    


    // // edit comment field
    //     // begin edit
    // $scope.contenteditable = false;
    // $scope.bgColor = 'bg-none';
    // $scope.display = 'd-none';
    // $scope.edit = function(event){
    //     this.bgColor = 'bg-secondary';
    //     this.contenteditable = true;
    //     this.display = 'd-flex';
    //     var comment = this.person.comment;z
    //     console.log(this.$index);

    //         // cancel edit
    //     $scope.cancel = function(event){
    //         this.bgColor = 'bg-none';
    //         this.contenteditable = false;
    //         this.display = 'd-none';
    //         this.person.comment = comment;
           
    //         // console.log(this.person.comment);
    //     };
    // };
}]);
