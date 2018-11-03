$(document).ready(function() {
    $(".cancel").click(function() {
      $(this).parent().parent().parent().parent().hide();
    });
    
    $(".connection").click(function() {
      $("#logindiv").css("display", "block");
    });
    
    $("#send").click(function() {
      var name = $("#username").val();
      var password = $("#password").val();
      $.post('/login',{name:name, password:password},function(data, status){
        if(status==='success'){
          $('#logindiv').hide();
        }
      }).error(function(res){
        switch(res.status){
          case 400:
            console.log(res.responseText)
            break;
          case 401:
            console.log(res.responseText)
            break;
        }
      });
    });
    
    $("#create").click(function() {
      var name = $("#login").val();
      var password = $("#passwd").val();
      var mail = $("#mail").val();
      $.post("/create",{name: name, password: password, email:mail},function(data,status){       
        console.log(status)
        if(status==='success')          
        {
          $('#logindiv').hide();
        }
      }).error(function(res){
        switch(res.status){
          case 400:
            console.log(res.responseText)
            break;
          case 409:
            console.log(res.responseText)
            break;
        }
      });
    });
    
    
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
  });

  