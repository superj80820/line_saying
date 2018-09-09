/* This file controls front-end animation and page transition */

$( document ).ready(function() {
  //hide drawPad and textbarAlbums
  // $('#flash').hide();
  // $('#aww-wrapper').hide();
  // $('#helptext').hide();
  //hide back button
  // console.log("hiding!");
  // $('#songDetail').hide();
  // $('#back-icon').fadeOut();

});

// // Spotify api call
// var aRequest = function(){
//   $.ajax({
//     url: ''
//   })
// }

// var curPage = 'home';
// var ready = false;      /* ready for streaming */

// var canReveal = false;

// /******************* Embedding Aww Board *******************/

function change_image(){
  console.log(aww.defaultOps())
  console.log(aww.getBoardInfo());
  aww.drawImage('images/4.jpg', 0, 0);
}

// var imageURL;

// Aww board API, board initialization

 var aww = new AwwBoard('#aww-wrapper', {
    menuOrder: ['colors', 'sizes', 'tools', 'admin','utils'],
    tools: ['pencil', 'eraser', 'text', 'image'],
    apiKey: '2be81bd6-3cf1-4a90-bdc4-f111d470537d',
    boardLink: '5aj5342-56tz-uhjk-9874',
    autoJoin: true,
    multiPage: true,
    sendUserPointer: true,
    showUserPointers: true
});

// // Get dataURL of current canvas
// function saveBoard(){
//   var img = aww.getImage();
//   return img;
// }

// // Change field of form to dataURL to prepare form submission
// function getDataURL(){
//     document.getElementById('imgDataURL').value = saveBoard();
//     return true;
// }

// /*************** Animation ************************/
// //show canvas, draw button
// function showCanvas(){

//   function downsize(){
//     TweenMax.to('.discAnimate', 1.5, {scale: 0.3})
//   }

//   //hide textbar
//   TweenMax.to('#introbar', 1.5, { ease: Power2.easeInOut, x: -1000});

//   //hide vinyl
//   TweenMax.to('.discAnimate', 1.5, { ease: Power2.easeInOut, rotation: 60, x: -308, onComplete:downsize});

//   //show textbar
//   TweenMax.fromTo(document.getElementById('helptext'), 1.5, { ease: Power2.easeInOut, x: 750}, {x:0});


//   //fade in pad
//   //TweenMax.from(document.getElementById('aww-wrapper'), 1, { ease: SlowMo.ease.config(0.1, 0.1, false), opacity:0, delay: 0.7});
//   TweenMax.fromTo(document.getElementById('aww-wrapper'), 1.8, {opacity: 0, delay:0.4}, {ease: Power2.easeInOut, opacity:1});
//   //fade in returnButton
//   TweenMax.to('.btnBox', 1.5, { ease: Power2.easeInOut, x: 450, delay: 1})

//   /* add drawPad */
//   $('#aww-wrapper').show();
//   $('#helptext').show();


//   /* show backButton */
//   $('#back-icon').fadeIn();
//   TweenMax.to(document.getElementById('back-icon'), 1.2, {ease: Power2.easeInOut, x:0});
//   /* keep track of current page */
//   curPage = 'canvas';

// }

// //show song details, go button
// //future while loop


// function showSongDetail(){
//   var currentSpotifyURI = "spotify:artist:44gRHbEm4Uqa0ykW0rDTNk";
//   //hide textbarAlbums
//   TweenMax.to(document.getElementById('helptext'), 1.5, { ease: Power2.easeInOut, x: 2000});

//   //show vinyl
//   TweenMax.to('.discAnimate', 0, {scale: 1});
//   TweenMax.to('.discAnimate', 1.5, { ease: Power2.easeInOut, rotation: 20, x: -170 , scale: 1, delay: 1.4});
//   TweenMax.to('.discAnimate', 1.3, { ease: Power3.easeInOut, rotation: 60, x: -380, delay: 2.9 });
//   TweenMax.to('.discAnimate', 1.5, { ease: Power1.easeOut, rotation: 10, x: -75, scale: 1, delay: 5.1});
//   TweenMax.to('.discAnimate', 1.85, { ease: Power4.easeInOut, rotation: 60, x: -380, delay: 6.7});

//   canReveal = true;
//   TweenMax.to(document.getElementById('aww-wrapper'), 2, { ease: Power2.easeInOut, opacity: 0});

//   TweenMax.to('.discAnimate', 2.2, { ease: Power2.easeInOut, rotation: 0, x: 75, scale: 1, delay: 8.2});

//   curPage = 'song';
// }


// function reveal(res) {
//   document.getElementById('disc').src = res.images[0].url;
//   document.getElementById('song-artist').innerHTML = res.artists[0].name;
//   document.getElementById('song-title').innerHTML = res.tracks.items[0].name;

  

//     //take the current spotify URI, extract the image link, then overlay image ontop of disc

//     //hide pad
//   //  TweenMax.to(document.getElementById('aww-wrapper'), 2, { ease: Power2.easeInOut, opacity: 0});
//     TweenMax.fromTo(document.getElementById('cover'), 2, {opacity: 1}, {ease: Power2.easeInOut, x: -3300, delay: 8.2});

//     //hide return
//     //TweenMax.to('.btnBox', 3, { ease: Power2.easeInOut, x: -800});
//     console.log(imageURL);

//     //bring out player
//     TweenMax.fromTo(document.getElementById('songDetail'), 1.65, { opacity: 0,ease: Power3.easeOut, x:-1200}, {opacity:1, ease: Power3.easeOut, x:0, delay: 8.26});
// }


// function lookForSong(){
//     //$('#aww-wrapper').hide();
//     //$('#cover').hide();
//     //$('#helptext').hide();
//     $('#songDetail').show();
//     TweenMax.fromTo(document.getElementById('songDetail'), 0, {opacity:0}, {x:-4000, opacity:0});
//     $('#disc').addClass('clip-circle');

//     // roll vinyl over
//     //TweenMax.to('.discAnimate', 1.5, { ease: Power2.easeInOut, rotation: 270, x: 100});
// }

// /************** 'Try These' Pictures *******************/

// $('.recommendedArt').on('click', function(){
//     console.log('you clicked the image!');
//     var img = $(this).attr('src');
//     console.log(img);
//     aww.drawImage(img, 0, 0);
// })

// /************** Sending DataURL for Processing *******************/

// function saveBoard(){
//     var img = aww.getImage();
//     $.ajax({
//         url: 'http://127.0.0.1:3000/handle',
//         type: 'POST',
//         timeout: 0,
//         data: JSON.stringify({ img: img }),
//         contentType: "application/json; charset=utf-8",
//         // dataType: "json",
//         success: function (res) {
//             console.log(res);
//             $.ajax({
//               url: 'https://api.spotify.com/v1/albums/' + res,
//               type: 'GET',
//               timeout: 0,
//               success: function(res) {
//                 tryReveal();
//                 function tryReveal() {
//                   if (canReveal) {
//                     reveal(res);
//                   } else {
//                     setTimeout(tryReveal, 50);
//                   }
//                 }
//                 songReady(res);
//               },
//               failure: function(jqXHR, textStatus, error) {
//                 if (textStatus === 'timeout') {
//                     console.log('request timed out');
//                 } else {
//                     console.log(error);
//                 }
//               }
//             });
//         },
//         error: function(jqXHR, textStatus, error) {
//             if (textStatus === 'timeout') {
//                 console.log('request timed out');
//             } else {
//                 console.log(error);
//             }
//         }
//     });
// }

// var playing = false;
// var currentSong = 0;

// var cachedResults;

// // handle API result
// function songReady(result){
//   cachedResults = result;
//   var sampleLink = result.tracks.items[0].preview_url;
//   document.getElementById('audio_player').src = sampleLink;
// }

// // Action button controlling music streaming
// function playPauseSong(){
//   var audio = document.getElementById('audio_player');
//   if (!playing) {
//     audio.play();
//     playing = true;
//   } else {
//     audio.pause();
//     playing = false;
//   }
// }

// function nextSong(){
//   var audio = document.getElementById('audio_player');
//   audio.pause();
//   currentSong++;
//   if (currentSong > cashedResults.tracks.items.length) {
//     currentSong = currentSong - 1;
//     return;
//   }
//   document.getElementById('audio_player').src = cachedResults.tracks.items[currentSong].preview_url;
//   audio.play();
// }

// function prevSong(){
//   var audio = document.getElementById('audio_player');
//   audio.pause();
//   currentSong--;
//   if (currentSong < 0) {
//     currentSong = 0;
//     return;
//   }
//   document.getElementById('audio_player').src = cachedResults.tracks.items[currentSong].preview_url;
//   audio.play();
// }

// /****************** Transition Page ************************/

// /* Handle hide/show element of page transition */
// function backToCanvas(){

//   console.log('you invoked backToCanvas!');

//   /* hide song detail element */
// //  $('#songDetail').hide();
//   TweenMax.fromTo(document.getElementById('songDetail'), 2.2, {x:0} ,{ ease: Power2.easeOut, x: -800, delay: 0});
// //  $('#disc').attr('src', 'image/disc.png').removeClass('clip-circle');
//   TweenMax.to('.discAnimate', 1.5, { ease: Power2.easeInOut, rotation: 60, x: -308});

//   /* show stuff */
//   //$('#helptext').show();
//   TweenMax.fromTo(document.getElementById('helptext'), 1.5, { ease: Power2.easeInOut, x: 750}, {x:0});

//   //$('#cover').show();
//   TweenMax.fromTo(document.getElementById('cover'), 3, { ease: Power2.easeInOut, x: -3300, delay: 1.3}, {x:70});

// //    $('#aww-wrapper').show();
//   TweenMax.fromTo(document.getElementById('aww-wrapper'), 1.8, {opacity: 0, delay:0.4}, {ease: Power2.easeInOut, opacity:1});

//   /* update current page location */
//   curPage = 'canvas';
// }

// function backToHome(){

//   console.log('you invoked backToHome!');

//   /* hide canvas elements */
// //  $('#helptext').hide();
//   TweenMax.to(document.getElementById('helptext'), 1.8, {ease: Power2.easeInOut, x: 800});
//   //$('#aww-wrapper').hide();

//   TweenMax.fromTo(document.getElementById('aww-wrapper'), 1.8, {opacity: 1}, {ease: Power2.easeInOut, opacity:0});
//   /* show homepage elements */
// //  $('#introbar').show();
//   TweenMax.to(document.getElementById('introbar'), 1.8, {ease: Power2.easeInOut, x:0});

//   /* missing line: vinyl row over */
//   TweenMax.to(document.getElementById('disc'), 0.3, {scale: 1});
//   TweenMax.to(document.getElementById('disc'), 1.8, {ease: Power2.easeInOut, x:0, rotation: 0});

//   /* hide back icon */
// //  $('#back-icon').fadeOut();
//   TweenMax.to(document.getElementById('back-icon'), 1.2, {ease: Power2.easeInOut, x:-300});
//   /* update current page location */
//   curPage = 'home';
// }

// /* Handle page transition, whenever back button is clicked */
// function goBack(){
//     if (curPage === 'song') backToCanvas();
//     else if (curPage === 'canvas') backToHome();
// }


// // Button Change, Pause Play
// function changePausePlay(){

// }
// // When ta spin????
// var switchBool = false;
// function switchSpinBoolean(bool){
//   bool = !bool;
// }
// while (switchBool) {
//   TweenMax.to('disc', 5, {rotation:"360", repeat:-1});
// };


// /*************** Button Icon Attr ************************/

// $('#back-icon').hover(function(){
//     $('#back-icon').attr('src', './image/buttons/back-hov.png');
// }, function(){
//     $('#back-icon').attr('src', './image/buttons/back.png');
// });

// $('#play').hover(function(){
//     if (playing) $('#play').attr('src', './image/buttons/pause-hov.png');
//     else ($('#play').attr('src', './image/buttons/play-hov.png'));
// }, function(){
//     if (playing) $('#play').attr('src', './image/buttons/pause.png');
//     else ($('#play').attr('src', './image/buttons/play.png'));
// });

// /*  Unimplemented: next, prev button */
// $('#next').hover(function(){
//     $('#next').attr('src', './image/buttons/next-hov.png');
// }, function(){
//     $('#next').attr('src', './image/buttons/next.png');
// });

// $('#prev').hover(function(){
//     $('#prev').attr('src', './image/buttons/prev-hov.png');
// }, function(){
//     $('#prev').attr('src', './image/buttons/prev.png');
// });

