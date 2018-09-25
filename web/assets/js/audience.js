$(document).ready(function() {
    var meet_name=$.cookie("MeetName");
    var sent_id=$.cookie("SentId");
    var slide_link=$.cookie("SlideLink");
    var invite_id=$.cookie("InviteId");
    var slide_key=$.cookie("SlideKey");
    var aww_link=$.cookie("AwwLink");
    
    console.log(meet_name);
    console.log(sent_id);
    console.log(slide_link);
    console.log(invite_id);
    console.log(slide_key);

    document.title=meet_name+"-觀眾頁";
    $(WebId).text(invite_id);
    document.getElementById("AwwLink").src="https://awwapp.com/b/"+aww_link+"/";

    $.ajax({
      type: 'GET',
      url: 'https://messfar.com/line_saying_api/user_say?meet_id='+sent_id,
      dataType: 'json',
        success: function(test_dic) {
          var item1 ="<tbody>"
          var i;
          // var s="";
          test_j = test_dic
          n = test_j.length
          var item = '<table><thead><tr><th>觀眾姓名</th><th>附加圖片</th><th>問題</th><th>留言時間</th></tr></thead>';
          for (i=0;i<n;i++){
            $.cookie("ButtonImage_"+i,test_j[i].image);
            // alert("網址 為: " + test_j[i].image);
            // var s2 = test_j[i].time.substring(0,10);
            // var s3 = test_j[i].time.substring(11,19);
            var name = test_j[i].name;
            var time = test_j[i].timestamp;
            var id = test_j[i].name;
            if (test_j[i].image=='null' || test_j[i].image==null){
              image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="無">'  
            }else{
              image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="顯示">'
            }
            item1 += '<tr><td>'+name+'</td><td>'+image+'</td><td>'+test_j[i].say+'</td><td>'+time+'</td></tr>';
            // var name = getName(id,i);
          }
          var item2 = '</tbody></table>';
          $ulT.append(item+item1+item2);
          
          // message   
          if ("Notification" in window){
            let ask = Notification.requestPermission();
            ask.then(permission => {
              if(permission == "granted"){
                let msg = new Notification(name, {
                  body: test_j[0].say,
                  icon: href="images/logo.jpg"
                });
              }
            });
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
    var $ulT = $("ul[class='contect']");
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