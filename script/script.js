$(document).ready(function(){
    // load animation
    $("#loader").fadeOut(400, function(){
        $("#page").fadeIn(400);
    });
        
    $("#logForm").submit(function(event) {
        var form = this;
        event.preventDefault();             // prevent submit
        $("#page").fadeOut(400, function(){ // amination
            form.submit();                  // submit when amination done
        });
    });
    // load animation end
});