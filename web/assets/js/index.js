function sent_id() {
	var meet_name=document.getElementById('MeetName').value;
	var sent_id=document.getElementById('SentId').value;
	var slide_link=document.getElementById('SlideLink').value;
	var meet_detail=document.getElementById('MeetDetail').value;

	console.log(meet_name);
	console.log(sent_id);
	console.log(slide_link);
	console.log(meet_detail);

	$.cookie("MeetName",meet_name);
	$.cookie("SentId",sent_id);
	$.cookie("SlideLink",slide_link);
	$.cookie("MeetDetail",meet_detail);
	
	$.ajax({
		type: 'POST',
		url: 'https://messfar.com/line_saying_api/create_meet',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify({
			"meet_name": meet_name,
			"web_id": sent_id,
			"slide_link": slide_link,
			"detail":meet_detail
		}),
		success: function(test_res) {  
			if (test_res == "create fail"){
				alert("創建失敗啊!~")
			}
			else{
				console.log(test_res)
				$.cookie("InviteId",test_res.invite_id);
				$.cookie("SlideKey",test_res.slide_key);
				$.cookie("AwwLink",test_res.aww_link);
				console.log(test_res.invite_id);
				console.log(test_res.slide_key);
				console.log(test_res.aww_link);
				
				window.location.href="speech.html";
			}
		},
		error: function(test_res){
			alert("創建失敗啊!~")
		}
	}); 
}

function getid(){
	var meet_name=$.cookie("MeetName");
	var sent_id=$.cookie("SentId");
	var slide_link=$.cookie("SlideLink");
	var invite_id=$.cookie("InviteId");
	var slide_key=$.cookie("SlideKey");

	console.log(meet_name);
	console.log(sent_id);
	console.log(slide_link);
	console.log(invite_id);
	console.log(slide_key);
}

