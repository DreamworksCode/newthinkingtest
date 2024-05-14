// import React, { useEffect, useState } from 'react'
// import UseSpeechToText from '../UseSpeechToText';
// const Test = () => {
//     const [textInput,setTextInput]=useState('');
//     // const [audio,setAudio]=useState(null);
//     const {isListening,transcript,startListening,stopListening}=UseSpeechToText({continuous:true});
//     useEffect(()=>{
//         setTextInput(transcript);
//         // setAudio(audioStream);
//     },[transcript]);
//     const startStopListening=()=>{
//         isListening?stopListening():startListening()
//     }

//   return (
//     <div className='bg-black '>
//       <button className='w-20 h-10 bg-blue-800 text-white' onClick={()=>startStopListening()}>{isListening?"Stop":"Start"}</button>
//       <textarea  id="" cols="30" rows="10" value={textInput}></textarea>
//       {/* <textarea value={audio} id="" cols="30" rows="10"></textarea> */}
//     </div>
//   )
// }

// export default Test

import React from 'react'
import UseSpeechToText from '../UseSpeechToText'

const Test = () => {
  return (
    <div>
      <UseSpeechToText/>
    </div>
  )
}

export default Test

