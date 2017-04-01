var name;

document.querySelector('.button').addEventListener('click',function(e){
    validation_name(e)
});

window.addEventListener('keydown',function(e){
    if(e.keyCode ==13)
    {
        validation_name(e)
    }
});


function validation_name(e){
    var input = document.querySelector('input');
    name = input.value;
    document.querySelector('form').style.display = "none";
    document.querySelector('.audio').style.display = "block";
    e.preventDefault;
    audio_recording();
}


function audio_recording(){
    document.querySelector('.text').innerHTML = name

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        },                

                               function(stream) {
            var line = document.querySelectorAll('.line'),
                audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            javascriptNode.onaudioprocess = function() {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += (array[i]);
                }
                for(var i = 0; i <= line.length/2; i++){
                    average = (values / length)/(50 + (i * 6 + Math.random()*8)) -0.25;
                    if(average>0.01){
                        line[line.length/2 - i].style.transform = 'translate(-50%,-50%) scaleY('+ average + ')';
                        line[line.length/2 + i-1].style.transform = 'translate(-50%,-50%) scaleY('+ average + ')';
                    } 
                    else{
                        line[line.length/2 - i].style.transform = 'translate(-50%,-50%) scaleY(0.01)';
                        line[line.length/2 + i-1].style.transform = 'translate(-50%,-50%) scaleY(0.01)';
                    }
                }


            } // end fn stream
        },
                               function(err) {
            console.log("The following error occured: " + err.name)
        });
    } else {
        console.log("getUserMedia not supported");
    }

}