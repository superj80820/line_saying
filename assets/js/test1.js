$(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: 'https://lis.apps.exosite.io/api:1/lecture/01161fc5ff/log?theType=message&start_time=2018-08-14T00%3A00%3A00Z',
      dataType: 'json',
        success: function(test_dic) {
            var item1 ="<tbody>"
            var i;
            var s="";
            test_j = test_dic
            n = test_j.length
            var item = '<table><thead><tr><th>Audience Name</th><th>Inquiry Content</th><th>Inquiry Time</th></tr></thead>';
            for (i=0;i<n;i++){
              var s2 = test_j[i].time.substring(0,10);
              var s3 = test_j[i].time.substring(11,19);
              var id = test_j[i].userId;
              item1 += '<tr><td><span id=na'+i+'></span></td><td>'+test_j[i].message+'</td><td>'+s2+' '+s3+'</td></tr>';
              var name = getName(id,i);
            }
            var item2 = '</tbody></table>';
            $ulT.append(item+item1+item2);
        }
    }); 
    function getName(id,i){
      $.ajax({
        type: 'GET',
        url: 'https://lis.apps.exosite.io/api:1/line/'+id,
        dataType: 'json',
          success: function(test_j) {
                s = '#na'+i;
                $(s).text(test_j.displayName);
          },
          error: function(){
            s = '#na'+i
            $(s).text('GHOST');
          }

      });
    }

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
  });

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