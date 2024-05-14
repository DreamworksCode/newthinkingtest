import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioAnalyzer from "./Audio_Analyzer";
import AudioElevenAnalyzer from "./Audio_ElevenAnalyzer";
import LoadingAnimation from "../Loading_Animation/LoadingAnimation";
import LoadingModel from "../LoadingModal/LoadingModal";
import Message from "@/public/assets/Chatbot/message.png";
import Send from "@/public/assets/Chatbot/send.png";
import Microphone from "@/public/assets/Chatbot/microphone.png";
import logo from "@/public/assets/Chatbot/NT_Logo.png";
import Image from "next/image";
import dynamic from "next/dynamic";
import UseSpeechToText from "../UseSpeechToText";
import ListeningAnimation from "../VoiceListeningAnimation/listeningAnimation";
import { Howl } from "howler";
import styles from "@/styles/chatbot.module.css";
import Hls from "hls.js";
let audioContext;
let streamReader;
let lastScheduledTime;
let gainNode;

const BUFFER_SIZE = 5; // Adjust the buffer size as needed
let audioBufferQueue = []; // Queue to store audio buffers
let isPlaying = false; // Flag to track if audio is currently playing

const RecordRTC = dynamic(() => import("recordrtc"), {
  ssr: false,
});

const Chatbot = ({ isChatOpen, setIsChatOpen, micOpen, setMicOpen }) => {
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [openMicModel, setOpenMicModel] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! How can I help you?" },
  ]);
  const [audio, setAudio] = useState(null);
  const [elevenAudio, setElevenAudio] = useState(null);
  const [handleEmptyText, setHandleEmptyText] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [validation, setValidation] = useState(false);
  const [textInput, setTextInput] = useState("");
  const chatbotBodyRef = useRef(null);
  const { isListening, transcript, startListening, stopListening } =
    UseSpeechToText({ continuous: true });
  // const [audioUrl, setAudioUrl] = useState("");
  // const audioRef = useRef(null);
  // const [audioLoaded, setAudioLoaded] = useState(false);

  // const [transcript,setTranscript]=useState('');
  // const [isListening, setIsListening] = useState(false);
  // let socket;
  // let recorder;

  useEffect(() => {
    if (chatbotBodyRef.current) {
      chatbotBodyRef.current.scrollTop = chatbotBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);
  useEffect(() => {
    // setTextInput(prev=>{prev+(transcript.length?(" "+transcript):" ")});
    setTextInput(transcript);
    // console.log(transcript);
  }, [transcript]);

  //For Audio context
  useEffect(() => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // audioContext = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'playback', sampleRate: 44100 });
    // alert("Use effect called");
    // Create a GainNode
    gainNode = audioContext.createGain();

    // Connect the GainNode to the destination (speakers)
    gainNode.connect(audioContext.destination);
    // Set the gain value to increase volume (default is 1)
    const volume = 2; // Increase the volume by multiplying it by a factor
    gainNode.gain.value = volume;
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const togglecloseModel = () => {
    setOpenMicModel(false); 
    // SpeechRecognition.stopListening();
    stopListening();
  };

  const elevenLabs = useCallback(
    (text) => {
      setIsLoading(true);
      console.log("this is elevenlabs: " + new Date().toLocaleTimeString());
      fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/x3VpW8wv7JS6uqDe2280/stream?optimize_streaming_latency=2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "30db19d4fc2dfc7942bce8f1ed0e2fda",
          },
          body: JSON.stringify({
            // model_id: "eleven_multilingual_v2",
            model_id: "eleven_turbo_v2",
            text: text,
            // voice_settings: {
            //   stability: 1,
            //   similarity_boost: 1.0,
            //   style: 1.0,
            //   use_speaker_boost: true,
            // },
          }),
        }
      )
        .then((response) => {
          if (!response.body) { 
            throw new Error("ReadableStream not supported!");
          }
          return response.body;
        })
        .then((stream) => {
          console.log("first time stream");
          console.log(stream);
      console.log("First_TIme Stream TIme: " + new Date().toLocaleTimeString());

          // playStreamingAudio(stream);
          playAudioStream(stream);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error calling API:", error);
        })
        .finally(() => {
          setChatMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { type: "bot", text: text },
          ]);
          setIsLoading(false);
          setHandleEmptyText(false);
        });
    },
    [setIsLoading, setChatMessages]
  );

  function decodeAudioData(chunk) {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(chunk, resolve, reject);
    });
  }

  // Function to convert chunk to ArrayBuffer
  function chunkToArrayBuffer(chunk) {
    // Convert chunk to Uint8Array
    const uint8Array = new Uint8Array(chunk);

    // Create ArrayBuffer from Uint8Array
    return uint8Array.buffer;
  }

  // Assume audioContext is properly set up

  // Define a function to play audio chunk

  // Function to handle when the audio source ends

  // Example usage:
  // Assume 'chunk' contains audio data (e.g., fetched from an HLS stream)
  // playAudioChunk(chunk);

  const playNextAudioChunk = () => {
    if (audioBufferQueue.length > 0) {
      isPlaying = true;
      const audioBuffer = audioBufferQueue.shift();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNode);
      const currentTime = audioContext.currentTime;
      source.start(currentTime);
      source.addEventListener("ended", () => {
        isPlaying = false;
        playNextAudioChunk();
      });
    }
    else {
      console.log("Empty Audio Buffer!!!");
    }
  };

  // const playAudioStream = async (stream) => {
  //   streamReader = stream.getReader();
  //   while (true) {
  //     const { value, done } = await streamReader.read();
  //     if (done) break;
  //     if (!value) {
  //       console.log("Empty chunk.");
  //       continue;
  //     }
  //     const arrayBuffer = chunkToArrayBuffer(value);
  //     if (arrayBuffer) {
  //       const audioBuffer = await decodeAudioData(arrayBuffer);
  //       audioBufferQueue.push(audioBuffer);
  //       if (!isPlaying) playNextAudioChunk();
  //     }
  //     else {
  //       console.log("Empty array buffer.");
  //     }
  //     // Check if the buffer size exceeds the limit
  //     // if (audioBufferQueue.length >= BUFFER_SIZE) break;
  //   }
  // };

  const playAudioStream = async (stream) => {
    streamReader = stream.getReader();
    while (true) {
      const { value, done } = await streamReader.read();
      if (done) break;
      if (!value) {
        console.log("Empty chunk.");
        continue;
      }
      const arrayBuffer = chunkToArrayBuffer(value);
      if (arrayBuffer) {
        try {
          const audioBuffer = await decodeAudioData(arrayBuffer);
          audioBufferQueue.push(audioBuffer);
          if (!isPlaying) playNextAudioChunk();
        } catch (error) {
          console.error("Error decoding audio data:", error);
        }
      } else {
        console.log("Empty array buffer.");
      }
    }
  };
  

  const playStreamingAudio = async (stream) => {
    // alert("Function started");
    const audio = new Audio();
    // alert("audio object created");
    const mediaSource = new MediaSource();
    // const mediaSource = new MediaSource();
    // alert("mediaSource Oject created");
    audio.src = URL.createObjectURL(mediaSource);
    // alert("Audio src is defined");

    let sourceBuffer;
    let bufferQueue = [];
    let previousBuffer;
    const chunkSize = 256;

    mediaSource.addEventListener("sourceopen", () => {
      sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      // alert("MEDIA SOURCE BUFFER REACHED");
      sourceBuffer.mode = "sequence";
      const reader = stream.getReader();
      console.log(reader);

      const readChunk = async () => {
        const { value, done } = await reader.read();
        console.log(value);
        if (done) {
          mediaSource.endOfStream();
          return;
        }

        // Split the chunk into smaller chunks of size 'chunkSize'
        for (let i = 0; i < value.length; i += chunkSize) {
          const chunk = value.slice(i, i + chunkSize);
          console.log(chunk);
          bufferQueue.push(chunk);
        }

        if (!sourceBuffer.updating) {
          appendNextChunk();
        }
      };

      const appendNextChunk = () => {
        if (bufferQueue.length > 0) {
          if (!sourceBuffer.updating) {
            previousBuffer = bufferQueue.shift();
            sourceBuffer.appendBuffer(previousBuffer);
            console.log("appendNextChunk");
          }
        } else {
          readChunk();
        }
      };

      sourceBuffer.addEventListener("updateend", () => {
        setElevenAudio(audio);
        appendNextChunk();
      });

      audio.addEventListener("ended", () => {
        setValidation(false);
      });

      readChunk();
    });

    mediaSource.addEventListener("sourceended", () => {
      console.log("MediaSource has ended");
    });

    mediaSource.addEventListener("sourceclose", () => {
      console.log("MediaSource is closed");
    });

     
    await audio.play().catch((error) => alert("Error playing audio:", error));
    console.log("AudioStarted: " + new Date().toLocaleTimeString());
  };

  const handleCallApi = useCallback(() => {
    console.log("ModalOpened: " + new Date().toLocaleTimeString());
    setAudio(null);
    setOpenMicModel(true);
    setValidation(true);
    setIsLoading(true);

    stopListening();
    console.log("StopListening Reached");

    if (textInput) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: textInput },
      ]);

      // Call the API here
      fetch("https://api.mirar.ai/auth/getAIResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "42bef730-7a95-475e-990f-ec4e3d450b24",
        },
        body: JSON.stringify({
          message: textInput,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: "..." }, // Loading indicator for the last bot message
          ]);
          elevenLabs(data.text);
          setHandleEmptyText(false);
        })
        .catch((error) => {
          console.error("Error calling API:", error);
        });
      // Reset the transcript after sending the message
      // resetTranscript();
    }
  }, [
    transcript,
    elevenLabs,
    setAudio,
    setIsLoading,
    setOpenMicModel,
    setHandleEmptyText,
    setChatMessages,
  ]);

  useEffect(() => {
    let timeoutId;
    if (isListening) {
      console.log("Speech recognition started...");
    } else {
      console.log("No voice detected.");
      // Set a timeout to stop listening after 1000 milliseconds (1.0 seconds)
      timeoutId = setTimeout(() => {
        if (stopListening) {
          console.log("Handleapicalled: transcript: ", textInput);
          if (textInput) {
            handleCallApi();
          } else {
            setAudio(null);
            setHandleEmptyText(true);
          }
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isListening, handleCallApi, transcript, setHandleEmptyText]);

  const handleMicButtonClick = () => {
    console.log("Mic button clicked");
    setValidation(false);
    setInputMessage("");
    setElevenAudio(null);
    setMicOpen(false);
    setHandleEmptyText(false);
    setAudio(1);
    setOpenMicModel(true);
    startListening();
  };

  const handleSendMessage = () => {
    console.log("MessageSent: " + new Date().toLocaleTimeString());
    // setIsLoading(true);
    const messageToSend = inputMessage.trim();
    if (!messageToSend) {
      return;
    }
    setValidation(true);
    // Append the user message to the chatMessages state
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: messageToSend },
    ]);

    // Clear the input field
    setInputMessage("");

    // Call the API here
    fetch("https://api.mirar.ai/auth/getAIResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "42bef730-7a95-475e-990f-ec4e3d450b24",
      },
      body: JSON.stringify({ message: messageToSend }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "..." },
          // { type: "bot", text: data.text },
        ]);
        elevenLabs(data.text);
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!validation) {
        handleSendMessage();
      }
    }
  };

  const [dotCount, setDotCount] = useState(1);
  useEffect(() => {
    if (audio) {
      const interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount % 5) + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [audio]);

  useEffect(() => {
    if (micOpen && isChatOpen) {
      handleMicButtonClick();
      console.log("Action action");
    }
  }, [micOpen, isChatOpen]);

  return (
    <>
      <div className={`chatbot-container ${isChatOpen ? "open" : ""}`}>
        <div className="chatbot-toggle" onClick={toggleChat}>
          <Image
            src={Message}
            // className="chatbottoggelimage"
            height={40}
            width={40}
            alt="Chatbot Icon"
          />
        </div>
        {openMicModel ? (
          <div className="chatbot-window-mic">
            <div className="chatbot-header1">
              <span className="chatbot-title">
                <Image src={logo} alt="New Thinking Version 2 logo" />
              </span>
              {/* <button className="closeButton chatbotButton" onClick={togglecloseModel} disabled={handleToggleButton} >
             <i className="fa fa-close" style={{ fontSize: "32px" }}></i>
             </button> */}
            </div>
            <div>
              {!audio && !elevenAudio && !isLoading && handleEmptyText && (
                <div className="d-flex justify-center align-center text-center pt-5  font-serif flex-col p-3">
                  {" "}
                  <p className="text-4xl font-serif m-0">Oops!</p>
                  <span className="font-serif text-l">
                    Voice not detect please tap on Re-load button to start
                    listening...
                  </span>
                </div>
              )}
              {audio && (
                // <div >
                //   {" "}
                //   <AudioAnalyzer audio={audio} />{" "}
                // <AmplitudeAnalyzer stream={audio}/>
                // </div>
                // <div className="d-flex justify-center align-center text-center pt-5  font-serif flex-col p-3">
                //   {" "}
                //   <p className="text-4xl font-serif m-0">Listening...</p>
                // </div>
                <div className="pt-24">
                  <ListeningAnimation />
                </div>
              )}
              {elevenAudio && (
                <>
                  {/* <audio
                    controls
                    autoPlay
                    className="audiobox hidden"
                    ref={audioRef}
                  >
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio> */}
                  <AudioElevenAnalyzer
                    setValidation={setValidation}
                    handleMicButtonClick={handleMicButtonClick}
                    audio={elevenAudio}
                    // audioContext={elevenAudio}
                  />
                </>
              )}
              {isLoading && (
                <div className="pt-16">
                  {" "}
                  <LoadingModel />{" "}
                </div>
              )}
            </div>
            <div className="chatbot-mic-box micposition ">
              {/* {audio && (
                <p className="listening-animation text-center font-serif ">
                  Listening
                  <span className="dot-dot-">
                    {Array(dotCount).fill(".").join("")}
                  </span>
                </p>
              )} */}
              {isLoading && (
                <p className="listening-animation text-center font-serif ">
                  Processing....
                </p>
              )}{" "}
              <div className="row chatbotButtonRow">
                <div className="col-md-2 p-2 icon-refresh">
                  {!audio && !elevenAudio && !isLoading && handleEmptyText && (
                    <i
                      className="fa fa-refresh  cursor-pointer pl-8  refresh"
                      onClick={handleMicButtonClick}
                      style={{ fontSize: "25px" }}
                    ></i>
                  )}
                </div>
                <div className="col-md-10">
                  <div className="icon-play-pause md:flex">
                    <button
                      style={{ float: "left", paddingLeft: "64px" }}
                      className="close"
                    >
                      <div className="justify-center d-flex flex-col align-items-center ">
                        <div className="icon-play" onClick={togglecloseModel}>
                          <i
                            className="fa fa-close"
                            style={{ fontSize: "34px" }}
                          ></i>
                        </div>
                        {/* <span className="pt-2 font-serif">Tap to pause</span> */}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          isChatOpen && (
            <div className="chatbot-window">
              <div className="chatbot-header">
                <span className="chatbot-title">
                  <Image src={logo} alt="Thinking Website Latest Logo" />
                </span>
                <button
                  className="closeButton chatbotButton"
                  onClick={toggleChat}
                >
                  <i className="fa fa-close" style={{ fontSize: "32px" }}></i>
                </button>
              </div>
              <div className="chatbot-body" ref={chatbotBodyRef}>
                {/* Display chat messages */}
                {chatMessages.map((message, index) => (
                  <div key={index} className={`chat-message ${message.type}`}>
                    {message.type === "bot" && message.text === "..." && (
                      <LoadingAnimation />
                    )}
                    {message.type === "bot" &&
                      message.text !== "..." &&
                      message.text}
                    {message.type !== "bot" && message.text}
                  </div>
                ))}
              </div>
              {/* Input field and send button */}
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleInputKeyPress}
                />
                <button
                  className="send-button chatbotButton"
                  onClick={handleSendMessage}
                  disabled={validation}
                >
                  <Image src={Send} alt="Send Message" />
                </button>
                <button
                  className="mic-button chatbotButton"
                  onClick={handleMicButtonClick}
                  disabled={validation}
                >
                  <Image src={Microphone} alt="Mic Icon" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Chatbot;

// const startRecording = () => {
//   // establish wss with AssemblyAI at 16000 sample rate
//   let token="172d478650ab4e4ebc4379de74690b96";
//   socket = new WebSocket(
//     `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`
//   );

//   // handle incoming messages to display transcription to the DOM
//   const texts = {};
//   socket.onmessage = (message) => {
//     let msg = "";
//     const res = JSON.parse(message.data);
//     texts[res.audio_start] = res.text;
//     const keys = Object.keys(texts);
//     keys.sort((a, b) => a - b);
//     for (const key of keys) {
//       if (texts[key]) {
//         msg += ` ${texts[key]}`;
//       }
//     }
//     setTranscript(msg);
//   };

//   // handle error
//   socket.onerror = (event) => {
//     console.error(event);
//     socket.close();
//   };

//   // handle socket close
//   socket.onclose = (event) => {
//     console.log(event);
//     socket = null;
//     setIsListening(false);
//   };

//   // handle socket open
//   socket.onopen = () => {
//       recorder = RecordRTC(audio, {
//           type: "audio",
//           mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
//           recorderType: "StereoAudioRecorder",
//           timeSlice: 250, // set 250 ms intervals of data
//           desiredSampRate: 16000,
//           numberOfAudioChannels: 1, // real-time requires only one channel
//           bufferSize: 4096,
//           audioBitsPerSecond: 128000,
//           ondataavailable: (blob) => {
//             const reader = new FileReader();
//             reader.onload = () => {
//               const base64data = reader.result;

//               // audio data must be sent as a base64 encoded string
//               if (socket) {
//                 socket.send(
//                   JSON.stringify({
//                     audio_data: base64data.split("base64,")[1],
//                   })
//                 );
//               }
//             };
//             reader.readAsDataURL(blob);
//           },
//       });
//       recorder.startRecording();
//       setIsListening(true);
//   }
// };

// const stopRecording = () => {
//   if (recorder) {
//     recorder.pauseRecording();
//     recorder = null;
//   }
//   if (socket) {
//     socket.send(JSON.stringify({ terminate_session: true }));
//     socket.close();
//     socket = null;
//   }
//   setIsListening(false);
// };
