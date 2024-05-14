//The perfect one....
import React, { useEffect, useRef, useState } from "react";

const UseSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recgonitionRef = useRef(null);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      
      console.log("web speech api is not supported in the browser");
      return;
    }
    const options={};
    recgonitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;
    if ("webkitSpeechGrammarList" in window) {
      const grammar ="#JSGF V1.0; grammar punctuation; public ‹punc> = . | , | ? | ! | ; | :";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult=(event)=>{
        let text="";
        for(let i=0; i<event.results.length; i++){
            text+=event.results[i][0].transcript;
        }
        setTranscript(text);
    }
    recognition.onerror=(event)=>{
        console.log("Speech Recognition Error : "+ event.error)
    }
    
    recognition.onend=()=>{
      // alert("ONEND CALLED");
        setIsListening(false);
        setTranscript('');
    }
    return ()=>{
        recognition.stop();
    }

  },[]);

  const startListening=()=>{
    console.log("Start Listening in the index.jsx file called");
    if(recgonitionRef.current && !isListening){
        recgonitionRef.current.start();
        setIsListening(true);
    }
  }

  const stopListening=()=>{
    if(recgonitionRef.current && isListening){
        recgonitionRef.current.stop();
        setIsListening(false);
        return true;
    }
  }


  return {
    isListening,
    transcript,
    startListening,
    stopListening
  }
};

export default UseSpeechToText;


//Test subject only
// import React, { useEffect, useRef, useState } from "react";

// const UseSpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [audioStream, setAudioStream] = useState(null);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       console.log("Web Speech API is not supported in the browser");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.interimResults = true;
//     recognition.lang = "en-US";
//     recognition.continuous = false;

//     recognition.onresult = (event) => {
//       let text = "";
//       for (let i = 0; i < event.results.length; i++) {
//         text += event.results[i][0].transcript;
//       }
//       setTranscript(text);
//     };

//     recognition.onerror = (event) => {
//       console.log("Speech Recognition Error: " + event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const startListening = async () => {
//     console.log("Start Listening called");
//     if (recognitionRef.current && !isListening) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         setAudioStream(stream);

//         const audioContext = new AudioContext();
//         const audioSource = audioContext.createMediaStreamSource(stream);

//         // Now you can use `audioSource` for further processing or analysis

//         // Make sure to handle the stream and context appropriately
//         // e.g., stop the stream and close the context when no longer needed

//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (error) {
//         console.error("Error accessing microphone:", error);
//       }
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setAudioStream(null); // Clear the audio stream when stopping listening
//     }
//   };

//   return {
//     isListening,
//     transcript,
//     audioStream,
//     startListening,
//     stopListening,
//   };
// };

// export default UseSpeechToText;

// import React, { useEffect, useRef, useState } from "react";

// const UseSpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [audioStream, setAudioStream] = useState(null);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const initializeSpeechRecognition = async () => {
//       try {
//         if (!("webkitSpeechRecognition" in window) || !("getUserMedia" in navigator.mediaDevices)) {
//           console.log("Web Speech API or getUserMedia is not supported in the browser");
//           return;
//         }

//         const options = {};
//         const recognition = new window.webkitSpeechRecognition();
//         recognition.interimResults = options.interimResults || true;
//         recognition.lang = options.lang || "en-US";
//         recognition.continuous = options.continuous || false;

//         if ("webkitSpeechGrammarList" in window) {
//           const grammar = "#JSGF V1.0; grammar punctuation; public ‹punc> = . | , | ? | ! | ; | :";
//           const speechRecognitionList = new window.webkitSpeechGrammarList();
//           speechRecognitionList.addFromString(grammar, 1);
//           recognition.grammars = speechRecognitionList;
//         }

//         recognition.onresult = (event) => {
//           let text = "";
//           for (let i = 0; i < event.results.length; i++) {
//             text += event.results[i][0].transcript;
//           }
//           setTranscript(text);
//         };

//         recognition.onerror = (event) => {
//           console.log("Speech Recognition Error: " + event.error);
//         };

//         recognition.onend = () => {
//           setIsListening(false);
//         };

//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         setAudioStream(stream);
//         recognitionRef.current = recognition;
//       } catch (error) {
//         console.error("Error initializing speech recognition:", error);
//       }
//     };

//     initializeSpeechRecognition();

//     return () => {
//       if (audioStream) {
//         audioStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={startListening} disabled={isListening}>
//         Start Listening
//       </button>
//       <button onClick={stopListening} disabled={!isListening}>
//         Stop Listening
//       </button>
//       <p>Transcript: {transcript}</p>
//     </div>
//   );
// };

// export default UseSpeechToText;

