prediction_1 = "" ;
prediction_2 = ""; 

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90 
}) ;

camera=document.getElementById("camera") ;

Webcam.attach('#camera') ;

function takeSnapshot(){
  Webcam.snap(function(data_uri){
   document.getElementById("result").innerHTML ='<img id="captured_image" src="'+data_uri+'">' ;
  })  ;
}

console.log('ml5 version' , ml5.version) ;

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5uTx04EnA/model.json'  ,modelLoaded) ;

function modelLoaded(){
    console.log('Model has been Loaded .');
}

function speak(){
  var synth=window.speechSynthesis ;
  speak_1="The first prediction is "  + prediction_1 ;
  speak_2="And the second prediction is" + prediction_2 ;
  var utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2) ;
  synth.speak(utterThis);
}

function Check(){
  img=document.getElementById("captured_image") ;
  classifier.classify(img , gotResult) ;
}

function gotResult(error , results){
  if(error){
    console.error(error);
  }
  else{
    console.log(results) ;
    document.getElementById("emotion_name_1").innerHTML=results[0].label ;
    document.getElementById("emotion_name_2").innerHTML=results[1].label ;
    prediction_1=results[0].label ;
    prediction_2=results[1].label ;
    speak();


    if(results[0].label == "Happy"){
      document.getElementById("emotion_emoji_1").innerHTML ="&#128522;";
  }
  if(results[0].label == "Sad"){
    document.getElementById("emotion_emoji_1").innerHTML ="&#128532;";
  }
  if(results[0].label == "Angry"){
    document.getElementById("emotion_emoji_1").innerHTML ="&#128548;";
  }


  if(results[1].label == "Happy"){
    document.getElementById("emotion_emoji_2").innerHTML ="&#128522;";
}
if(results[1].label == "Sad"){
  document.getElementById("emotion_emoji_2").innerHTML ="&#128532;";
}
if(results[1].label == "Angry"){
  document.getElementById("emotion_emoji_2").innerHTML ="&#128548;";
}

}}