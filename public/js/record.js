//
$(function(){
	//録音開始
	$("#record").click(function(e){
 		e.preventDefault();	
		var bufferSize = 4096;
		var mediaStreamSource = audioContext.createMediaStreamSource(stream);
		var scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
		mediaStreamSource.connect(scriptProcessor);
		audioBufferArray = [];
		scriptProcessor.onaudioprocess = function(event){
			var channel = event.inputBuffer.getChannelData(0);
			var buffer = new Float32Array(bufferSize);
			for (var i = 0; i < bufferSize; i++) {
				buffer[i] = channel[i];
			}
			audioBufferArray.push(buffer);
		}
		scriptProcessor.connect(audioContext.destination);
	});	
});