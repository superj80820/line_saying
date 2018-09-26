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

    $(WebId).text(invite_id);
    document.getElementById("AwwLink").src="https://awwapp.com/b/"+aww_link+"/";
  
    
    setInterval(function(){
      ajax_init();
    },3000);
   // var headings = document.evaluate('//*[@id="aaa1"]/ul/table/tbody/tr[1]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            // console.log(headings) 
    
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
  

  function show_image(button){
    var image_link=$.cookie(button.id);
    if (image_link == '' || image_link == undefined || image_link == null || image_link == 'null'){
      document.getElementById('change_image').src = "images/image.jpg";
    }else{
      document.getElementById('change_image').src = image_link;
    }
  }


  function ajax_init(){
    var $ulT = $("ul[class='contect']");
    var sent_id=$.cookie("SentId");

    $.ajax({
      type: 'GET',
      url: 'https://messfar.com/line_saying_api/user_say?meet_id='+sent_id,
      dataType: 'json',
        success: function(test_dic) {
          $('table').remove();
            var item1 ="<tbody>"
            var i;
            test_j = test_dic
            n = test_j.length

            var item = '<table><thead><tr><th>觀眾姓名</th><th>附加圖片</th><th>問題</th><th>留言時間</th></tr></thead>';
            for (i=n-1;i>=0;i--){
              $.cookie("ButtonImage_"+i,test_j[i].image);
              var name = test_j[i].name;
              var time = test_j[i].timestamp;
              var id = test_j[i].name;
              if (test_j[i].image=='null' || test_j[i].image==null){
                image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="無">'  
              }else{
                image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="顯示">'
              }
              
              item1 += '<tr><td>'+name+'</td><td>'+image+'</td><td>'+test_j[i].say+'</td><td>'+time+'</td></tr>';
            }
            var item2 = '</tbody></table>';
            $ulT.append(item+item1+item2);
            
        }
    });
  }

  //////////因為圖片更新不會同步 所以棄用//////////////////
  // function ajax_repeat(){
  //   var timestamp = document.evaluate('//*[@id="aaa1"]/ul/table/tbody/tr[1]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
  //   if(timestamp == null || timestamp == 'null'){
  //     ajax_init()
  //   }else{
  //     console.log(timestamp.textContent)   
  //     ajax_get('&timestamp='+timestamp.textContent)
  //   }
  // }

  // function ajax_get(timestamp){
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://messfar.com/line_saying_api/user_say?meet_id='+'41684'+timestamp,
  //     dataType: 'json',
  //       success: function(test_dic) {
  //           var item1 =""
  //           var i;
  //           test_j = test_dic
  //           n = test_j.length

  //           var item = '<table><thead><tr><th>觀眾姓名</th><th>附加圖片</th><th>問題</th><th>留言時間</th></tr></thead>';
  //           for (i=n-1;i>=0;i--){
  //             $.cookie("ButtonImage_"+i,test_j[i].image);
  //             var name = test_j[i].name;
  //             var time = test_j[i].timestamp;
  //             var id = test_j[i].name;
  //             if (test_j[i].image=='null' || test_j[i].image==null){
  //               image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="無">'  
  //             }else{
  //               image='<input type=button onclick="show_image(this)" id="ButtonImage_'+i+'" value="顯示">'
  //             }
              
  //             item1 += '<tr><td>'+name+'</td><td>'+image+'</td><td>'+test_j[i].say+'</td><td>'+time+'</td></tr>';
  //           }
  //           $('tbody').prepend(item1);
  //       }
  //   });
  // }
  //////////因為圖片更新不會同步 所以棄用//////////////////