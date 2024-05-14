import React, { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import AudioVisualizer from "./Audio_Visualizer";

const AudioAnalyzer = ({ audio }) => {
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


  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    sourceRef.current = audioContextRef.current.createMediaStreamSource(audio);
    sourceRef.current.connect(analyserRef.current);
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      analyserRef.current.disconnect();
      sourceRef.current.disconnect();
    };
  }, [audio, tick]);

  return (<><AudioVisualizer audioData={audioData} /></>);
};

export default AudioAnalyzer;

 