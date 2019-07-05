var myApp = angular.module('myApp', []);
myApp.controller('aplCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    // get data
    $http.get('data/aplications.json').then(function(response){
        $scope.aplications = response.data;
    });

    // sort data
    $scope.order = 'Number(id_apl)';
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
        $scope.person = this.person;
        $scope.personName = this.person.first_name + ' ' + this.person.last_name;

        $scope.confirm = function(){
            var id = $scope.person.id_apl;
            $scope.aplications = $filter('filter')($scope.aplications, {id_apl: id},
                function(actual, expected){
                    return actual !== expected;
                });
            $('#deleteModal').modal('toggle');
        // $scope.aplications.splice(item,1)
        // console.log(id);
        // console.log(item);
        // arrayRemove($scope.aplications, item);        
        };
    };

    // add record
        // clear form at start
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
    
        // validation
        $scope.savePerson = function(){
            var execute = 1;
            $('#emailError').removeClass('d-flex').addClass('d-none');
            $('#emailErrorSec').removeClass('d-flex').addClass('d-none');
            $('#firstNameError').removeClass('d-flex').addClass('d-none');
            $('#firstNameErrorSec').removeClass('d-flex').addClass('d-none');
            $('#lastNameError').removeClass('d-flex').addClass('d-none');
            $('#lastNameErrorSec').removeClass('d-flex').addClass('d-none');
            $('#fileError').removeClass('d-flex').addClass('d-none');
            $('#fileErrorSec').removeClass('d-flex').addClass('d-none');
            var email = $('#inputEmail')[0].value;
            var firsName = $('#inputFirstName')[0].value;
            var lastName = $('#inputLastName')[0].value;
            var comment = $('#inputComment')[0].value;
            var file = $('#inputFile')[0].files[0];
            var fileMaxSize = 400000;
            if(comment === ''){
                $scope.newPerson.comment = '';
            };
        
            // email validation
            if(email == ''){
                $('#emailError').removeClass('d-none').addClass('d-flex');
                execute = 0;
            }else{
                let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regEmail.test(email)){
                    $('#emailErrorSec').removeClass('d-none').addClass('d-flex');
                    execute = 0;
                };
            };
                
            // first name validation
            if(firsName == ''){
                $('#firstNameError').removeClass('d-none').addClass('d-flex');
                execute = 0;
            }else{
                var regFirstName = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
                if (!regFirstName.test(firsName)){
                    $('#firstNameErrorSec').removeClass('d-none').addClass('d-flex');
                    execute = 0;
                };
            };

            // last name validation
            if(lastName == ''){
                $('#lastNameError').removeClass('d-none').addClass('d-flex');
                execute = 0;
            }else{
                var regLastName = /^(?!-)(?!.*--)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-]+(?<!-)$/;
                if (!regLastName.test(lastName)){
                    $('#lastNameErrorSec').removeClass('d-none').addClass('d-flex');
                    execute = 0;
                };
            };

            // file validation
            if(file === undefined){
                $('#fileError').removeClass('d-none').addClass('d-flex');
                execute = 0;
            }else{
                var fileSize = $('#inputFile')[0].files[0].size;
                var fileType = $('#inputFile')[0].files[0].type;
                if (fileSize > fileMaxSize || fileType != 'application/pdf'){
                    $('#fileErrorSec').removeClass('d-none').addClass('d-flex');
                    execute = 0;
                };
            };
            // execution if all validation pass
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
                // var formData = new FormData();
                // formData.append('file', $('#inputFile')[0].files[0]);

                // $.ajax({
                //     url : 'uploads/cvs',
                //     type : 'POST',
                //     data : formData,
                //     processData: false,  // tell jQuery not to process the data
                //     contentType: false,  // tell jQuery not to set contentType
                //     success : function(data) {
                //         console.log(data);
                //         alert(data);
                //     }
                // });
                $scope.newPerson.email = '';
                $scope.newPerson.first_name = '';
                $scope.newPerson.last_name = '';
                $scope.newPerson.comment = '';
                $('#addModal').modal('toggle');
            };
        };
    };
    //  add record end

}]);
