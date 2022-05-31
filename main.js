prediction="";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90     
})

camera=document.getElementById("camera") ;

Webcam.attach('#camera') ;

function takeSnapshot(){
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML ='<img id="captured_image" src="'+data_uri+'">' ;
    })  ;
  }

  console.log('ml5 version' , ml5.version) ;

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gEgoNX7Iq/model.json'  ,modelLoaded) ;

function modelLoaded(){
    console.log('Model has been Loaded .');
}
function speak(){
    synth=window.speechSynthesis ;
    speak="The prediction is "+ prediction;
    var utterThis = new SpeechSynthesisUtterance(speak) ;
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
      document.getElementById("gesture_name").innerHTML=results[0].label ;
      prediction=results[0].label ;
      speak();
  
  
      if(results[0].label == "Okay"){
        document.getElementById("gesture_emoji").innerHTML ="&#128076;";
    }
    if(results[0].label == "Thumbs up"){
      document.getElementById("gesture_emoji").innerHTML ="&#128077;";
    }
    if(results[0].label == "Thumbs down"){
      document.getElementById("gesture_emoji").innerHTML ="&#128078;";
    }

  
  }}