$(document).ready(function() {
  var meet_name=$.cookie("MeetName");
  var sent_id=$.cookie("SentId");
  var slide_link=$.cookie("SlideLink");
  var invite_id=$.cookie("InviteId");
  var slide_key=$.cookie("SlideKey");

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
        if (n>0){
          $('#vote_tite').hide();
        }
        else{
          $('#vote').hide();
          $('#allvote').hide();
        }
        for (i=1;i<=n;i++){
          item = '<h3>'+test_dic[i-1].vote_name+'<b style=font-size:15px>&emsp;<span id=person'+i+'></span>&nbsp&nbspperson voted&nbsp&nbsp&nbsp&nbsp<input type=button id=sAdd value=Add></b></h3><span id=T'+i+'_option1></span></div><div><span id=T'+i+'_option2></span>';
          $ul.append(item);
          d1 = test_dic[i-1].vote_item[0]['label']
          d2 = test_dic[i-1].vote_item[1]['label']
          a1 = test_dic[i-1].vote_item[0]['vote_count']
          a2 = test_dic[i-1].vote_item[1]['vote_count']
          a = parseInt(a1)+parseInt(a2);
          s1 = "#T"+i+"_option1";
          s2 = "#T"+i+"_option2";
          console.log(d1)
          console.log(d2)
          $(s1).html("<input type=radio name=vote"+i+"_tite1 checked><label>"+d1+"&nbsp&nbsp&nbsp&nbsp"+a1+"/"+a+"</label>");
          $(s2).html("<input type=radio name=vote"+i+"_tite2><label>"+d2+"&nbsp&nbsp&nbsp&nbsp"+a2+"/"+a+"</label>");
          var id = test_dic[i-1].voteId
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
        "meet_id":"99323",
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