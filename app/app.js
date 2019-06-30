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
            $('#editModal').modal('toggle');
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
    $scope.addPerson = function(){
        $('#emailError').removeClass('d-flex').addClass('d-none');
        $('#firstNameError').removeClass('d-flex').addClass('d-none');
        $('#lastNameError').removeClass('d-flex').addClass('d-none');
        $('#fileError').removeClass('d-flex').addClass('d-none');
        $('#inputEmail')[0].value = '';
        $('#inputFirstName')[0].value = '';
        $('#inputLastName')[0].value = '';
        $('#inputComment')[0].value = '';
        $('#inputFile')[0].value = '';
    };
    $scope.savePerson = function(){
        var execute = 1;
        $('#emailError').removeClass('d-flex').addClass('d-none');
        $('#firstNameError').removeClass('d-flex').addClass('d-none');
        $('#lastNameError').removeClass('d-flex').addClass('d-none');
        $('#fileError').removeClass('d-flex').addClass('d-none');
        if($('#inputEmail')[0].value == ''){
            $('#emailError').removeClass('d-none').addClass('d-flex');
            execute = 0;
        };
        if($('#inputFirstName')[0].value == ''){
            $('#firstNameError').removeClass('d-none').addClass('d-flex');
            execute = 0;
        };
        if($('#inputLastName')[0].value == ''){
            $('#lastNameError').removeClass('d-none').addClass('d-flex');
            execute = 0;
        };
        if($('#inputFile')[0].value == ''){
            $('#fileError').removeClass('d-none').addClass('d-flex');
            execute = 0;
        };
        if (execute == 1){
            var ids = $scope.aplications.map(function(o) { 
                return parseInt(o.id_apl);
            });
            var maxId = ids.reduce(function(a, b) {
                return Math.max(a, b);
            });
            var newId = (maxId+1).toString();
            $scope.aplications.push({
                id_apl: newId,
                email: $scope.newPerson.email,
                first_name: $scope.newPerson.first_name,
                last_name: $scope.newPerson.last_name,
                comment: $scope.newPerson.comment,
            });
            $scope.newPerson.email = '';
            $scope.newPerson.first_name = '';
            $scope.newPerson.last_name = '';
            $scope.newPerson.comment = '';
            $('#addModal').modal('toggle');
        };
    };


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
