function sentid() {
	window.location.href="https://messfar.com/line_saying/home.html";
 
//window.open("https://messfar.com/line_saying/");
  //  window.open('','_top'); 
   // window.top.close(); 
//    window.location = "https://messfar.com/line_saying/home.html" 
  //  window.open("home.html");
//window.close();
  //  window.open("index.html");
	var sentid=document.getElementById('SentId').value;
	$.cookie("LineSayId",sentid);
	console.log(sentid);

	window.location.href="https://messfar.com/line_saying/home.html";
}

function getid(){
	var getid=$.cookie("LineSayId");
	console.log(getid);
}

