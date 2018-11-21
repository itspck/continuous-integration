$(document).ready(function() {
    $('#submitPizza').click(function(){
        var name = $("#pizza_name").val();
        var sauce = $("#sauce").val();
        var viande = $("#viande").val();
        var fromage = $("#fromage").val();
        var accompagnement = $("#accompagnement").val();
        var file = $("#file").val();
        var piquante = $("#piquante").is(':checked');
        console.log(name, sauce, viande, fromage, accompagnement, file, piquante);
        $.post('/new_pizza',{name, sauce, viande, fromage, accompagnement, file, piquante},function(data, status){
            if(status==='success'){
                console.log("Pizza créée")
                $("#perso").load(window.location.href + " #perso" )
                $('#modal1').modal('close');
            }
        }).error(function(res){
            console.log("error")
            $('#notify-error-2-icon').empty()
            $('#notify-error-2-icon').append('add_circle_outline')
            $('#notify-error-2-icon').css('transform','rotate(45deg)')
            $('#notify-error-2-text').empty()
            $('#notify-error-2-text').append(res.responseText)
            $('#notify-error-2').css({"display": 'block',"background-color":"#FF322C","z-index":"10"})
            window.setTimeout(function(){$('#notify-error-2').css("display","none")},3000)
          });
    })

})