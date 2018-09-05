function sent_id() {
// window.location.href="https://messfar.com/line_saying/home.html";
// window.open("https://messfar.com/line_saying/");
//  window.open('','_top'); 
//  window.top.close(); 
//  window.location = "https://messfar.com/line_saying/home.html" 
//  window.open("home.html");
//  window.close();
//  window.open("index.html");
	var meet_name=document.getElementById('MeetName').value;
	var sent_id=document.getElementById('SentId').value;
	var slide_link=document.getElementById('SlideLink').value;

	console.log(meet_name);
	console.log(sent_id);
	console.log(slide_link);

	$.cookie("MeetName",meet_name);
	$.cookie("SentId",sent_id);
	$.cookie("SlideLink",slide_link);
	
	$.ajax({
		type: 'POST',
		url: 'https://messfar.com/line_saying_api/create_meet',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify({
			"meet_name": meet_name,
			"web_id": sent_id,
			"slide_link": slide_link
		}),
		success: function(test_res) {  
			if (test_res == "create fail"){
				alert("創建失敗啊!~")
			}
			else{
				console.log(test_res)
				$.cookie("InviteId",test_res.invite_id);
				$.cookie("SlideKey",test_res.slide_key);
				console.log(test_res.invite_id);
				console.log(test_res.slide_key);
				
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

