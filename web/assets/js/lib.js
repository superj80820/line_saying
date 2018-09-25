function say_something(){
    var sent_id=$.cookie("SentId");

    var frm_element = document.getElementById ('SaySomething');
    var formData = new FormData(frm_element);

    if (check_type(formData.get('say'),$('#image').val())){
        formData.append('meet_id', sent_id);
        $.ajax({
            type:'POST',
            url: "https://messfar.com/line_saying_api/say",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
                $('#box').html('&nbsp&nbsp&nbsp&nbsp送出完成');
                setTimeout("$('#box').html('');",2000)
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }else{
        alert("傳送格式不符")
    }
}

function check_type(Say,ImageName){
    var re = /\.(jpg|png)$/i;
    if (''==Say && (ImageName == '' || ImageName == undefined || ImageName == null || ImageName == 'null')){
        return false
    }
    else if (''!=Say && (ImageName == '' || ImageName == undefined || ImageName == null || ImageName == 'null')){
        return true
    }
    else if (''==Say && (ImageName != '' || ImageName != undefined || ImageName != null || ImageName != 'null')){
        return re.test(ImageName)
    }
    else if (''!=Say && (ImageName != '' || ImageName != undefined || ImageName != null || ImageName != 'null')){
        return re.test(ImageName)
    }
}

function timestamp_to_date(timestamp){
    timestamp
    time = timestamp.split(".")[0];
    time = parseInt(time);
    time_date = new Date(time).getDate();
    time_month = new Date(time).getMonth();
    time_month = parseInt(time_month)+1;
    time = time_month+'/'+time_date;
    return time
}

function timestamp_to_hour(timestamp){
    timestamp
    time = timestamp.split(".")[0];
    time = parseInt(time);
    time_hours = new Date(time).getHours();
    time_minutes = new Date(time).getMinutes();
    time = time_hours+'時'+time_minutes+'分';
    return time
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}