/*
var pic;   
//if select file then upload   
$("#upload_file").on('change', uploadPic);   
function uploadPic(event){   
    //file object   
    pic = event.target.files;   
    var data = new FormData();   
    data.append("upload_file", pic[0]);   
  
    $.ajax({   
            url: 'upload_api',   
            type: 'POST',   
            data: data,   
            cache: false,   
            dataType: 'json',   
            processData: false, // Don't process the files   
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request   
        success: function(data, textStatus, jqXHR)   
        {   
            console.log(data);   
            
            if(typeof data.error === 'undefined')   
            {   
                // Success so call function to process the form   
            }   
            else  
            {   
                // Handle errors here   
                console.log('ERRORS: ' + data.error);   
            }   
        },   
        error: function(jqXHR, textStatus, errorThrown)   
        {   
            // Handle errors here   
            console.log('ERRORS: ' + textStatus);   
            // STOP LOADING SPINNER   
        }   
    });   
}*/

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://lis.apps.exosite.io/api:1/beacon/01161fc5ff',
        dataType: 'json',
        success: function(test_dic) {
            test_j = test_dic
            console.log(test_j);
            $("#title").text(test_j.title)
            $("#title2").text(test_j.info)
            }
    });
    
    
    var $ul = $("ul[class='link_list']");
    $(document).on('click', '#add', function() {
        var s = $('#na').val();
        item = '<h3><a href='+s+'>'+s+'</a></h3>';
        $ul.append(item);
        updateCount();
    });

    $(document).on('click', '#send', function() {
        $.ajax({
            type: 'POST',
            url: 'https://lis.apps.exosite.io/api:1/lecture/01161fc5ff/message/push',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify([{
                "type": "text",
                "text": $('#message').val()
            }]),
            complete: function(test_dic) {        
                document.getElementById("message").value="";
                $('#box').html('&nbsp&nbsp&nbsp&nbsp送出完成');
            }
          }); 
    });

    $(document).on('click', '#message', function() {
        $('#box').html('');
    });
});
