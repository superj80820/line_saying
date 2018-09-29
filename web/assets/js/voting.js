$(document).ready(function() {
  var meet_name=$.cookie("MeetName");
  var sent_id=$.cookie("SentId");
  var slide_link=$.cookie("SlideLink");
  var invite_id=$.cookie("InviteId");
  var slide_key=$.cookie("SlideKey");

  document.title=meet_name+"-投票頁";
  var $ul = $("ul[class='va']");
  var a,a1,a2;
  var flag=false;
  var s="",s1,s2;
  var d1,d2;
  var n;
  $.ajax({
    type: 'GET',
    url: 'https://messfar.com/line_saying_api/vote?meet_id='+sent_id,
    dataType: 'json',
      success: function(test_dic) {
        var i;
        n = test_dic.length
        if (n<=0){
          $('#vote').hide();
          $('#allvote').hide();
        }
        else{
          $('#vote_tite').hide();
        }
        for (i=1;i<=n;i++){
          item = '<h3>'+test_dic[i-1].vote_name+'<b style=font-size:15px>&emsp;<span id=person'+i+'></span>&nbsp&nbsp投票&nbsp&nbsp&nbsp&nbsp<input type=button id=sAdd value=Add></b></h3><span id=T'+i+'_option0></span></div><div><span id=T'+i+'_option1></span></div><div><span id=T'+i+'_option2></span><br /><br />';
          console.log(item)
          // '<span id=T'+i+'_option1></span></div><div><span id=T'+i+'_option2></span><span id=T'+i+'_option3></span>'
          $ul.append(item);
          option_long=test_dic[i-1].vote_item.length
          var all_count=0;
          var list_count=[];
          console.log("ss"+option_long)
          for (i2=0;i2<option_long;i2++){
            all_count=all_count+parseInt(test_dic[i-1].vote_item[i2]['vote_count'])
            list_count.push(parseInt(test_dic[i-1].vote_item[i2]['vote_count']))
          }
          max_num=Math.max(...list_count)
          console.log(list_count)
          for (i2=0;i2<option_long;i2++){
            // console.log(test_dic[i-1].vote_item[i2])
            label=test_dic[i-1].vote_item[i2]['label']
            count=test_dic[i-1].vote_item[i2]['vote_count']
            // d1 = test_dic[i-1].vote_item[i2]['label']
            // d2 = test_dic[i-1].vote_item[1]['label']
            // a1 = test_dic[i-1].vote_item[i2]['vote_count']
            // a2 = test_dic[i-1].vote_item[1]['vote_count']
            // a = parseInt(a1)+parseInt(a2);
            s1 = "#T"+i+"_option"+i2;
            console.log(s1)
            // s2 = "#T"+i+"_option"+i2+1;
            // s3 = "#T"+i+"_option"+i2+2;
            // console.log(d1)
            // console.log(d2)
            check=parseInt(count)
            if (check==max_num){
              $(s1).html("<input type=radio name=vote"+i+"_tite"+i2+" checked><label>"+label+"&nbsp&nbsp&nbsp&nbsp"+count+"/"+all_count+"</label>");  
            }else{
              $(s1).html("<input type=radio name=vote"+i+"_tite"+i2+"><label>"+label+"&nbsp&nbsp&nbsp&nbsp"+count+"/"+all_count+"</label>");
            }
            
            // $(s2).html("<input type=radio name=vote"+i+"_tite2><label>"+d1+"&nbsp&nbsp&nbsp&nbsp"+a1+"</label>");
            // $(s2).html("<input type=radio name=vote"+i+"_tite2><label>"+d2+"&nbsp&nbsp&nbsp&nbsp"+a2+"/"+a+"</label>");
            // $(s3).html("<input type=radio name=vote"+i+"_tite2><label>"+d2+"&nbsp&nbsp&nbsp&nbsp"+a2+"/"+a+"</label>");
          }
          
          // var id = test_dic[i-1].voteId
          // getBody(id,i,d1,d2);
        }
      }
  }); 
  
  
  function getBody(id,i,d1,d2){
    a1 = parseInt(test_j['01161fc5ff::'+id+'::a'])
    a2 = parseInt(test_j['01161fc5ff::'+id+'::b'])
    s1 = "#T"+i+"_option1";
    s2 = "#T"+i+"_option2";
    a = a1+a2
    if (a1 > a2){
      $(s1).html("<input type=radio name=vote"+i+"_tite1 checked><label>"+d1+"&nbsp&nbsp&nbsp&nbsp"+a1+"/"+a+"</label>");
      $(s2).html("<input type=radio name=vote"+i+"_tite2><label>"+d2+"&nbsp&nbsp&nbsp&nbsp"+a2+"/"+a+"</label>");
    }
    else{
      $(s1).html("<input type=radio name=vote"+i+"_tite1><label>"+d1+"&nbsp&nbsp&nbsp&nbsp"+a1+"/"+a+"</label>");
      $(s2).html("<input type=radio name=vote"+i+"_tite2 checked><label>"+d2+"&nbsp&nbsp&nbsp&nbsp"+a2+"/"+a+"</label>");
    }
    s = "#person"+i;
    $(s).text(a);
  }

  $(document).on('click', '#Vadd', function() {
    check();
  });

  $(document).on('click', '#add', function() {
    $('#vote').show();
    $('#vote_add').hide();
  });
  $(document).on('click', '#sAdd', function() {
    $('#vote_tite').show();
    $('#add').hide();
    $('#vote_one_tite').hide();
    $('#allvote').hide();
  }); 

  $(document).on('click', '#send', function() {
    var meet_name=$.cookie("MeetName");
    var sent_id=$.cookie("SentId");
    var slide_link=$.cookie("SlideLink");
    var invite_id=$.cookie("InviteId");
    var slide_key=$.cookie("SlideKey");

    var actions = [];

    for (i=1;i<=4;i++){
      str=$('#title_op'+i).val()
      if (str == '' || str == undefined || str == null){
        // None
      }else{
        actions.push({
          "type": "postback",
          "label": str,
          "data": "{'type':'vote','index':'"+i+"','label':'"+str+"'}"
      });
      }
    }
    
    console.log(actions)
    
    $.ajax({
      type: 'POST',
      url: 'https://messfar.com/line_saying_api/vote',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        "meet_id":sent_id,
        "vote_data":{
          "type": "template",
          "altText": "This is a buttons template",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "title": $('#title_na').val(),
            "text": "暫無設定",
            "actions": actions
          }
        }
        
    }),
      complete: function(test_dic) {        
        window.location.href = "success.html";
      }
    });
  }); 

});