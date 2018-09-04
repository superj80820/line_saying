function sent_id() {
	// window.location.href="https://messfar.com/line_saying/home.html";
 
//window.open("https://messfar.com/line_saying/");
  //  window.open('','_top'); 
   // window.top.close(); 
//    window.location = "https://messfar.com/line_saying/home.html" 
  //  window.open("home.html");
//window.close();
  //  window.open("index.html");
	var meet_name=document.getElementById('MeetName').value;
	var sent_id=document.getElementById('SentId').value;
	var slide_link=document.getElementById('SlideLink').value;
	$.cookie("MeetName",meet_name);
	$.cookie("SentId",sent_id);
	$.cookie("SlideLink",slide_link);
	console.log(meet_name);
	console.log(sent_id);
	console.log(slide_link);

	window.location.href="speech.html";
}

function getid(){
	var meet_name=$.cookie("MeetName");
	var sent_id=$.cookie("SentId");
	var slide_link=$.cookie("SlideLink");
	console.log(meet_name);
	console.log(sent_id);
	console.log(slide_link);
}

