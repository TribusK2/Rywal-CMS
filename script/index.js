$(document).ready(function(){
    $('#login')[0].value = '';
    $('#password')[0].value = '';

    // submit validation
    $("#logForm").submit(function(event) {
        event.preventDefault(); // prevent submit
        $('#loginError').removeClass('d-flex').addClass('d-none');
        $('#loginErrorSec').removeClass('d-flex').addClass('d-none');
        $('#passwordError').removeClass('d-flex').addClass('d-none');
        $('#passwordErrorSec').removeClass('d-flex').addClass('d-none');
        var login = $('#login')[0].value;
        var password = $('#password')[0].value;
        var submit = 1;
        var form = this;
        
        // login validation
        if(login == ''){
            $('#loginError').removeClass('d-none').addClass('d-flex');
            submit = 0;
        }else{
            // var regLogin = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
            var regLogin = 'rywal';
            if (regLogin !== login){
                $('#loginErrorSec').removeClass('d-none').addClass('d-flex');
                submit = 0;
            };
        };
        // password validation
        if(password == ''){
            $('#passwordError').removeClass('d-none').addClass('d-flex');
            submit = 0;
        }else{
            var regPass = 'rywal';
            if (regPass !== password){
                $('#passwordErrorSec').removeClass('d-none').addClass('d-flex');
                submit = 0;
            };
        };
        // submit when validation pass
        if(submit === 1){
            $("#page").fadeOut(400, function(){ // amination
                form.submit();                  // submit when amination done
            });
        };
        
    });
    
});