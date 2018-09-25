$(document).ready(function() {
  var $ulT1 = $("div[class='tab1content']");
  var $ulT2 = $("div[class='tab2content']");
  var $ulT3 = $("div[class='tab3content']");
  var $ulT4 = $("div[class='tab4content']");
  var user_id=getQueryVariable('user_id');
  var invite_id=getQueryVariable('invite_id');
  console.log(user_id)
  console.log(invite_id)
  
  $.ajax({
    type: 'GET',
    url: 'https://messfar.com/line_saying_api/user_note?user_id='+user_id+'&invite_id='+invite_id,
    dataType: 'json',
      success: function(test_dic) {
          console.log(test_dic)
          var item1;
          var i,n;
          test_j = test_dic;

          n = test_j.group_1.length;
          item1="";
          if (n != 0){
            for (i=0;i<n;i++){
              var note = test_j.group_1[i].note;
              var time = test_j.group_1[i].timestamp;
              time = timestamp_to_hour(time);
              var message_type = test_j.group_1[i].type;
              if (message_type=='text'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+note+'</h3>'
              }
              else if (message_type=='image'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+'<img id="change_image" src="'+note+'"  width="100%">'+'</h3>'
              }
            }
            console.log(item1)
            $ulT1.append(item1);
          }
          
          n = test_j.group_2.length;
          item1="";
          if (n != 0){
            for (i=0;i<n;i++){
              var note = test_j.group_2[i].note;
              var time = test_j.group_2[i].timestamp;
              time = timestamp_to_hour(time);
              var message_type = test_j.group_2[i].type;
              if (message_type=='text'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+note+'</h3>'
              }
              else if (message_type=='image'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+'<img id="change_image" src="'+note+'"  width="100%">'+'</h3>'
              }
            }
            console.log(item1)
            $ulT2.append(item1);
          }

          n = test_j.group_3.length;
          item1="";
          if (n != 0){
            for (i=0;i<n;i++){
              var note = test_j.group_3[i].note;
              var time = test_j.group_3[i].timestamp;
              time = timestamp_to_hour(time);
              var message_type = test_j.group_3[i].type;
              if (message_type=='text'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+note+'</h3>'
              }
              else if (message_type=='image'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+'<img id="change_image" src="'+note+'"  width="100%">'+'</h3>'
              }
            }
            console.log(item1)
            $ulT3.append(item1);
          }

          n = test_j.group_4.length;
          item1="";
          if (n != 0){
            for (i=0;i<n;i++){
              var note = test_j.group_4[i].note;
              var time = test_j.group_4[i].timestamp;
              time = timestamp_to_hour(time);
              var message_type = test_j.group_4[i].type;
              if (message_type=='text'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+note+'</h3>'
              }
              else if (message_type=='image'){
                item1 += '<h6 style="position: relative;top:20px;">'+time+'</h6>'+'<h3>'+'<img id="change_image" src="'+note+'"  width="100%">'+'</h3>'
              }
            }
            console.log(item1)
            $ulT4.append(item1);
          }
      }
  }); 
  // function getName(id,i){
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://lis.apps.exosite.io/api:1/line/'+id,
  //     dataType: 'json',
  //       success: function(test_j) {
  //             s = '#na'+i;
  //             $(s).text(test_j.displayName);
  //       },
  //       error: function(){
  //         s = '#na'+i
  //         $(s).text('GHOST');
  //       }

  //   });
  // }

  var a=1;
  var b=1;
  var c=2;
  var $ul = $('ul');
  
  // Hide form, show button first, when button clicked show form, hide button
  $('#aaa1').hide();
  $(document).on('click', '#title1', function() {
    if (a%2==0){
      $('#aaa1').hide();
      a++;
    }
    else{
      $('#aaa1').show();
      a++;
    }
   });


   $("button").click(function(){
    $("p").toggle();
  });
});

// $(document).on('click', '#abc', function() {
//   document.getElementById('change_image').src = "http://blog.iprefer.com.tw/wp-content/uploads/2012/08/%E9%9F%BF%E6%87%89%E5%BC%8F%E7%B6%B2%E9%A0%81.jpg";
//  });

 

/*$.ajax({
  type: 'GET',
  url: 'https://lis.apps.exosite.io/api:1/lecture/01161fc5ff/log?theType=message&start_time=2018-08-14T00%3A00%3A00Z',
  dataType: 'json',
    success: function(test_dic) {
        var i;
        var s;
        test_j = test_dic
        n = test_j.length
        for (i=0;i<n;i++){
          s = '#na'+i;
          var x = $(s).val();
          if (x==None){
            $(s).text('123');
          }
        }
    }
}); */

function show_image(button){
  var image_link=$.cookie(button.id);
  // alert("idd 為: " + image_link);
  if (image_link == '' || image_link == undefined || image_link == null || image_link == 'null'){
    document.getElementById('change_image').src = "images/image.jpg";
  }else{
    document.getElementById('change_image').src = image_link;
  }
}

