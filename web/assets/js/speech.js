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
    var meet_name=$.cookie("MeetName");
	var sent_id=$.cookie("SentId");
    var slide_link=$.cookie("SlideLink");
    var invite_id=$.cookie("InviteId");
    var slide_key=$.cookie("SlideKey");
    var aww_link=$.cookie("AwwLink");
    var meet_detail=$.cookie("MeetDetail");

    console.log(meet_name);
    console.log(meet_detail);
    console.log(sent_id);
    console.log(slide_link);
    console.log(invite_id);
    console.log(slide_key);
    console.log(aww_link);

    document.getElementById("title").innerHTML=meet_name;
    document.getElementById("title2").innerHTML=meet_detail;
    document.getElementById("AwwLink").src="https://awwapp.com/b/"+aww_link;
    document.getElementById("IframeSlide").src="https://www.slideshare.net/slideshow/embed_code/key/"+slide_key;
    $(WebId).text(invite_id);
    // document.getElementById("title").text='meet_name';
    // $(title).text(meet_name)
    // $(title2).text(detail)

    $.ajax({
        type: 'GET',
        url: 'https://messfar.com/line_saying_api/meet_info?meet_id='+sent_id,
        dataType: 'json',
        success: function(test_dic) {
            test_j = test_dic
            console.log(test_j);
            
            }
    });
    
    
    var $ul = $("ul[class='link_list']");
    $(document).on('click', '#add', function() {
        var s = $('#na').val();
        item = '<h3><a href='+s+'>'+s+'</a></h3>';
        $ul.append(item);
        updateCount();
    });

    $(document).on('click', '#send1', function() {
        $.ajax({
            type: 'POST',
            url: 'https://messfar.com/line_saying_api/say',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "meet_id": "99323",
                "say": $('#message').val()
            }),
            // error: function(req, err){ console.log('my message' + err); }
            complete: function(test_dic) {        
                document.getElementById("message").value="";
                $('#box').html('&nbsp&nbsp&nbsp&nbsp送出完成');
            }
          }); 
    });
    
    $('#image_data').on('submit',(function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('meet_id', sent_id);
        $.ajax({
            type:'POST',
            url: "https://messfar.com/line_saying_api/sent_image",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
                $('#box2').html('&nbsp&nbsp&nbsp&nbsp送出完成');
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }));

    $(document).on('click', '#message', function() {
        $('#box').html('');
    });

    $(document).on('click', '#image_data', function() {
        $('#box2').html('');
    });
});
