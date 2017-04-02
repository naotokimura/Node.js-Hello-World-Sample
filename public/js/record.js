//
$(function(){
	//録音開始
	$("#record").click(function(e){
		console.log("record started");
 		e.preventDefault();
		var localMediaStream = null;
	    var localScriptProcessor = null;
	    audioData = []; // 録音データ
	
	    var onAudioProcess = function(e) {
	      var input = e.inputBuffer.getChannelData(0);
	      var bufferData = new Float32Array(bufferSize);
	      for (var i = 0; i < bufferSize; i++) {
	        bufferData[i] = input[i];
	      }
	
	      audioData.push(bufferData);
	    };
	    var startRecording = function() {
	      navigator.getUserMedia(
	        { audio: true },
	        function(stream) {
	          localMediaStream = stream;
	          var scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
	          localScriptProcessor = scriptProcessor;
	          var mediastreamsource = audioContext.createMediaStreamSource(stream);
	          mediastreamsource.connect(scriptProcessor);
	          scriptProcessor.onaudioprocess = onAudioProcess;
	          scriptProcessor.connect(audioContext.destination);
	        },
	        function(e) {
	          console.log(e);
	        }
	      );
	    };
	});
});