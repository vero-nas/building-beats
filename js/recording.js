// Tutorials and projects consulted: https://github.com/addpipe/simple-recorderjs-demo/tree/master, 
// https://github.com/mattdiamond/Recorderjs, https://tonejs.github.io/docs/15.1.22/classes/Recorder.html,
// https://github.com/mdn/dom-examples/blob/main/media/web-dictaphone/scripts/app.js


/* Get the start recording and stop recording buttons from the HTML file*/
var recordBtn= document.getElementById("startRecording");
var stopBtn = document.getElementById("stopRecording");


/* Record an audio clip*/
function record(mainGainNode) {
	
	/* Initialize a Recorder instance */
	var rec = new Tone.Recorder();
	/* Connect the mainGainNode to the recorder*/
	mainGainNode.connect(rec);
	
	/* Once the start recording button is clicked, start the recorder*/
    recordBtn.addEventListener("click", () => {
		console.log("Record button clicked");
		/* Make the stop button able again*/
		stopBtn.disabled = false;
		rec.start()
		recordBtn.style.background = "red";
		console.log("Recording started");
    });

	/* Once the stop button is clicked, the recorder is stopped */
    stopBtn.addEventListener("click", () => {
    
      console.log("stopButton clicked");
	  recordBtn.style.background = "";
      //Disable the stop button, enable the record too allow for new recordings
      stopBtn.disabled = true;
      recordBtn.disabled = false;
      
	  /* Record an audio blob, then pass it to exportWAV to make it available for download as WAV*/
      setTimeout(async () => {
		const recording = await rec.stop();
		rec.exportWAV(createDownloadLink(recording));
	  }, 4000);
	  
	});

}


/* make the audio blob available as a WAV file */
function createDownloadLink(blob) {
	/* Set a default filename based on the current date and time*/
	var filename = new Date().toISOString();

	/* Prompt the user for a custom file name */
	const clipName = prompt(
			"Enter a name for your clip?",
			filename
		);
	
	/* Create a url connected to the audio blob item */
	var url = URL.createObjectURL(blob);

	/* Create an audio element */
	var au = document.createElement('audio');
	/* Create a link element*/
	var link = document.createElement('a');

	/* Get the settings div section from the HTML */
	var div = document.getElementById('setDiv');

	

	/* Add controls to the <audio> element, which creates an audio player*/
	au.controls = true;
	/* Attach the audio url source to the audio object*/
	au.src = url;
	

	/* Save to disk link*/
	link.href = url;

	/* If no name is given, use the default name*/
	if (clipName === null){
		/* Attach the WAV format to the name to force WAV download*/
		link.download = filename+".wav"; 
		/* Show the download link in HTML*/
		link.innerHTML = link.download;
		
	} else {
		/* If the clip name is specified, do the same as above with the custom clip name */
		link.download = clipName+".wav";
		link.innerHTML = link.download;
	}

	//add the new audio element to the div
	div.appendChild(au);
	// add the link to the div
	div.appendChild(link);

	/* Once the item has been downloaded (link has been clicked), remove the audio clip and the link
	to make space for a new one*/
	link.addEventListener("click", function(){
		div.removeChild(au);
		div.removeChild(link);
	});
	
	
}

