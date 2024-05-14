import React, { useState } from "react";

const Assembly = ({ stream }) => {
  let socket;
  let recorder;
  const [transcript,setTranscript]=useState('');
  const startRecording = () => {
    // establish wss with AssemblyAI at 16000 sample rate
    let token="";
    socket = new WebSocket(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`
    );

    // handle incoming messages to display transcription to the DOM
    const texts = {};
    socket.onmessage = (message) => {
      let msg = "";
      const res = JSON.parse(message.data);
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`;
        }
      }
      setTranscript(msg);
    };

    // handle error
    socket.onerror = (event) => {
      console.error(event);
      socket.close();
    };

    // handle socket close
    socket.onclose = (event) => {
      console.log(event);
      socket = null;
    };

    // handle socket open
    socket.onopen = () => {
        recorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
            recorderType: StereoAudioRecorder,
            timeSlice: 250, // set 250 ms intervals of data
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // real-time requires only one channel
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;

                // audio data must be sent as a base64 encoded string
                if (socket) {
                  socket.send(
                    JSON.stringify({
                      audio_data: base64data.split("base64,")[1],
                    })
                  );
                }
              };
              reader.readAsDataURL(blob);
            },
        });
        recorder.startRecording();
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.pauseRecording();
      recorder = null;
    }
    if (socket) {
      socket.send(JSON.stringify({ terminate_session: true }));
      socket.close();
      socket = null;
    }
  };
  return startRecording, stopRecording;
};

export default Assembly;
