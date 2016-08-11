(function(){
    //run material design
    $.material.init();
    $.material.ripples();
    $.material.input();

    //show form
    $('.add-data').on('click', function(){
        $('.data-user').show();
    });

    $('.data-user').on('submit', function(){
        var form = $(this);
        var formSer = form.serializeArray();
        var userData = {
            name: formSer[0].value,
            type: formSer[1].value,
            age: formSer[2].value
        };
        $.ajax({
            type: 'POST',
            url: '/users',
            data: userData,
            success: function(data){
                location.reload();
                form.trigger('reset');
            }
        });
        return false;
    });

    $('.del-data').on('click', function(){
        //todo
        //var userId = $(this).parent()[0].childNodes[0].pathname.replace(/\/user\//g, '');
        var userName = $(this).parent()[0].childNodes[0].text;
        $.ajax({
            type: 'DELETE',
            url: '/users/' + userName,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

})();