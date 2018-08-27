$(document).ready(function() {
  var $ul = $("ul[class='va']");
  var a,a1,a2;
  var flag=false;
  var s="",s1,s2;
  var d1,d2;
  var n;
  $.ajax({
    type: 'GET',
    url: 'https://lis.apps.exosite.io/api:1/lecture/01161fc5ff/vote',
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
          item = '<h3>'+test_dic[i-1].template['text']+'<b style=font-size:15px>&emsp;<span id=person'+i+'></span>&nbsp&nbspperson voted&nbsp&nbsp&nbsp&nbsp<input type=button id=sAdd value=Add></b></h3><span id=T'+i+'_option1></span></div><div><span id=T'+i+'_option2></span>';
          $ul.append(item);
          d1 = test_dic[i-1].template['actions'][0]['label']
          d2 = test_dic[i-1].template['actions'][1]['label']
          var id = test_dic[i-1].voteId
          getBody(id,i,d1,d2);
        }
      }
  }); 
  
  
  function getBody(id,i,d1,d2){
    $.ajax({
      type: 'GET',
      url: 'https://lis.apps.exosite.io/api:1/lecture/01161fc5ff/vote/'+id+'/count',
      dataType: 'json',
        success: function(test_j) {
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
    });
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
    var id = '01161fc5ff';
    
    $.ajax({
      type: 'POST',
      url: 'https://lis.apps.exosite.io/api:1/lecture/'+id+'/vote',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "投票",
            "text": $('#title_na').val(),
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [{
                    "type": "postback",
                    "label": $('#title_op1').val(),
                    "data": "{lectureId}::{voteId}::a"
                },
                {
                    "type": "postback",
                    "label": $('#title_op2').val(),
                    "data": "{lectureId}::{voteId}::b"
                }
            ]
        }
    }),
      complete: function(test_dic) {        
        window.location.href = "success.html";
      }
    });
  }); 

});