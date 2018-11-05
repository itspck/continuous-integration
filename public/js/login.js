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
          $('#notify-icon').empty()
          $('#notify-icon').append('check_circle_outline')
          $('#notify-text').empty()
          $('#notify-text').append('Bienvenue, vous êtes connecté')
          $('#notify').css({"display": 'block',"background-color":"#48B548"})
          $('#logindiv').hide();
          window.setTimeout(function(){$('#notify').css("display","none")},3000)
        }
      }).error(function(res){
        $('#notify-error-icon').empty()
        $('#notify-error-icon').append('add_circle_outline')
        $('#notify-error-icon').css('transform','rotate(45deg)')
        $('#notify-error-text').empty()
        $('#notify-error-text').append(res.responseText)
        $('#notify-error').css({"display": 'block',"background-color":"#FF322C","z-index":"10"})
        window.setTimeout(function(){$('#notify-error').css("display","none")},3000)
      });
    });
    
    $("#create").click(function() {
      var name = $("#login").val();
      var password = $("#passwd").val();
      var mail = $("#mail").val();
      $.post("/create",{name: name, password: password, email:mail},function(data,status){       
        if(status==='success')          
        {
          $('#notify-icon').empty()
          $('#notify-icon').append('check_circle_outline')
          $('#notify-text').empty()
          $('#notify-text').append('Votre compte a été créé')
          $('#notify').css({"display": 'block',"background-color":"#48B548"})
          $('#logindiv').hide();
          window.setTimeout(function(){$('#notify').css("display","none")},3000)
        }
      }).error(function(res){
        $('#notify-error-icon').empty()
        $('#notify-error-icon').append('add_circle_outline')
        $('#notify-error-icon').css('transform','rotate(45deg)')
        $('#notify-error-text').empty()
        $('#notify-error-text').append(res.responseText)
        $('#notify-error').css({"display": 'block',"background-color":"#FF322C","z-index":"10"})
        window.setTimeout(function(){$('#notify-error').css("display","none")},3000)
      });
    });
    
    
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
  });

  