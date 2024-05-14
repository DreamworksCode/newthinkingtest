import React, { useEffect, useState, useRef } from "react";

import { useCallback } from "react";
import AudioVisualizer from "./Audio_Visualizer";

const AudioElevenAnalyzer = ({ audio ,handleMicButtonClick,setValidation }) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const rafIdRef = useRef(null);

  const tick = useCallback(() => {
    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
    setAudioData(new Uint8Array(dataArrayRef.current));
    rafIdRef.current = requestAnimationFrame(tick);
  }, [setAudioData]);

  const onAudioEnd = useCallback(() => {
    // Stop the visualizer when audio ends
    handleMicButtonClick()
    cancelAnimationFrame(rafIdRef.current);
  }, [handleMicButtonClick]);

  useEffect(() => {
    const initAudioContext = async () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

      // Wait for the audio to be loaded and start playing
      await audio.play().catch((error) => { console.error("Error playing audio:", error)});
      console.log("AudioStarted: " + new Date().toLocaleTimeString());

      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    initAudioContext();

   // Set up an event listener for the audio end event
      audio.addEventListener('ended', onAudioEnd);

    return () => {
      // Clean up the event listener and disconnect audio context
      audio.removeEventListener('ended', onAudioEnd);
      cancelAnimationFrame(rafIdRef.current);
  
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
  
      if (sourceRef.current) {
        setValidation(false);
        sourceRef.current.disconnect();
      }
  
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(error => console.error("Error closing AudioContext:", error));
      }
    };
  }, [audio, tick, onAudioEnd,setValidation]);

  return <AudioVisualizer audioData={audioData} />;
};

export default AudioElevenAnalyzer;

// import React, { useEffect, useState, useRef } from "react";
// import AudioVisualizer from "./Audio_Visualizer";

// const AudioElevenAnalyzer = ({ audioContext, handleMicButtonClick, setValidation }) => {
//   const [audioData, setAudioData] = useState(new Uint8Array(0));
//   const analyserRef = useRef(null);
//   const dataArrayRef = useRef(null);
//   const rafIdRef = useRef(null);
//   console.log(audioContext);

//   const tick = () => {
//     if (analyserRef.current) {
//       analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
//       setAudioData(new Uint8Array(dataArrayRef.current));
//       rafIdRef.current = requestAnimationFrame(tick);
//     }
//   };

//   const onAudioEnd = () => {
//     handleMicButtonClick();
//     cancelAnimationFrame(rafIdRef.current);
//   };

//   useEffect(() => {
//     if (audioContext) {
//       analyserRef.current = audioContext.createAnalyser();
//       dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

//       rafIdRef.current = requestAnimationFrame(tick);

//       return () => {
//         cancelAnimationFrame(rafIdRef.current);
//         analyserRef.current.disconnect();
//         setValidation(false);
//       };
//     }
//   }, [audioContext, setValidation]);

//   // To handle audio end, we'll check periodically if the audio is still playing
//   useEffect(() => {
//     const checkAudioEnd = () => {
//       if (!audioContext || !audioContext.state || audioContext.state === 'closed') {
//         onAudioEnd();
//       } else {
//         setTimeout(checkAudioEnd, 1000); // Check every second
//       }
//     };

//     checkAudioEnd();

//     return () => {
//       clearTimeout();
//     };
//   }, [audioContext, onAudioEnd]);

//   return <AudioVisualizer audioData={audioData} />;
// };

// export default AudioElevenAnalyzer;
