// import React from 'react';
// import { useKeenSlider } from 'keen-slider/react';
// import Image from 'next/image';
// import styles from '@/styles/Home.module.css';
// import Chatbot from '@/pages/assets/Home/AIChatbot.gif';
// import Sms from '@/pages/assets/Home/SMSAI.gif';
// import SocMed from '@/pages/assets/Home/SocMed.gif';
// import WebVoice from '@/pages/assets/Home/WebVoice.gif';
// import Voice from '@/pages/assets/Home/AIVoice.gif';
// const Slider = () => {
//   const [sliderRef] = useKeenSlider({
//     loop: true, // Set loop to false
//     mode: 'free-snap',
//     slides: {
//       perView: 2,
//       spacing: 5,
//     }
//   });

//   return (
//     <div ref={sliderRef} className={`keen-slider ${styles['main_slider']} px-72 `}>
//       {[Chatbot, Voice, WebVoice, Sms, SocMed].map((image, index) => (
//         <div key={index} className={`keen-slider__slide ${styles['slider']}`}>
//           <Image src={image} alt="" width={600} height={500}  />
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Slider;

//Latest Version
// import React,{useState,useEffect} from 'react';
// import { useKeenSlider } from 'keen-slider/react';
// import Image from 'next/image';
// import styles from '@/styles/Home.module.css';
// import Chatbot from '@/public/assets/Home/AIChatbot.gif';
// import Sms from '@/public/assets/Home/SMSAI.gif';
// import SocMed from '@/public/assets/Home/SocMed.gif';
// import WebVoice from '@/public/assets/Home/WebVoice.gif';
// import Voice from '@/public/assets/Home/AIVoice.gif';

// const Slider = ({setIsChatOpen,setOpenMicModel}) => {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useEffect(() => {
//     // Check if window is defined (not during SSR)
//     if (typeof window !== 'undefined') {
//       // Function to handle resizing
//       const handleResize = () => {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       };

//       // Initial call to set initial window size
//       handleResize();

//       // Event listener for window resize
//       window.addEventListener('resize', handleResize);

//       // Cleanup the event listener on component unmount
//       return () => {
//         window.removeEventListener('resize', handleResize);
//       };
//     }
//   }, []);
//   let preview=1.2;
//   let padding_class="px-8";
//   if(windowSize.width>=500 && windowSize.width<=900){
//     preview=2;
//     padding_class="px-20"
//   }
//   else if(windowSize.width>=900  && windowSize.width<=1800){
//     preview=2;
//     padding_class="px-80";
//   }
//   else if(windowSize.width>=1800 && windowSize.width<=2400){
//     preview=1.5;
//     padding_class="px-80";
//   }
//   else if(windowSize.width>=2400){
//     preview=2.5;
//     padding_class="px-[300px]";
//   }
//   const [sliderRef] = useKeenSlider({
//     loop: true, // Set loop to false
//     mode: 'free-snap',
//     slides: {
//       perView: preview,
//       spacing: 5,
//     },
//     autoplay: {
//       delay: 2000, // Delay in milliseconds before changing slides
//       pauseOnMouseEnter: true, // Optional: Pause autoplay when mouse enters the slider
//       disableOnInteraction: false, // Resume autoplay after manually changing slide
//     },
//     duration: 1000, // Duration of the slide transition
//   });
//   function handleChatbot(){
//     setIsChatOpen((prevState) => !prevState);
  
//   }

//   function handleCall(){
//     console.log("voice called");
//     window.open('tel: +1 9148254243');

//   }

//   // function handleVoiceChat(){
//   //   setIsChatOpen((prevState) => !prevState);
//   //   setOpenMicModel(true);
//   // }

//   return (
//     <div ref={sliderRef} className={`keen-slider ${styles['main_slider']} ${padding_class} `}>
//       {/* {[Chatbot, Voice, WebVoice, Sms, SocMed].map((image, index) => (
//         <div key={index} className={`keen-slider__slide ${styles['slider']}`}>
//           <Image src={image} alt=""   />
//         </div>
//       ))} */}
//       <div onClick={handleChatbot} className={`keen-slider__slide ${styles['slider']}`}>
//         <Image src={Chatbot} alt='Chabot'/>
//       </div>
//       <div onClick={handleCall} className={`keen-slider__slide ${styles['slider']}`}>
//         <Image src={Voice} alt='voice'/>
//       </div>
//       <div  className={`keen-slider__slide ${styles['slider']}`}>
//         <Image src={WebVoice} alt='WebVoice'/>
//       </div>
//       <div className={`keen-slider__slide ${styles['slider']}`}>
//         <Image src={Sms} alt='SMS'/>
//       </div>
//       <div className={`keen-slider__slide ${styles['slider']}`}>
//         <Image src={SocMed} alt='Socmed'/>
//       </div>
//     </div>
//   );
// };

// export default Slider;

//tested one
import React,{useState,useEffect} from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Chatbot from '@/public/assets/Home/AIChatbot.gif';
import Sms from '@/public/assets/Home/SMSAI.gif';
import SocMed from '@/public/assets/Home/SocMed.gif';
import WebVoice from '@/public/assets/Home/WebVoice.gif';
import Voice from '@/public/assets/Home/AIVoice.gif';


const Slider = ({setIsChatOpen,setMicOpen}) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Check if window is defined (not during SSR)
    if (typeof window !== 'undefined') {
      // Function to handle resizing
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Initial call to set initial window size
      handleResize();

      // Event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  let preview=1.2;
  let padding_class="px-8";
  if(windowSize.width>=500 && windowSize.width<=900){
    preview=2;
    padding_class="px-20"
  }
  else if(windowSize.width>=900  && windowSize.width<=1800){
    preview=2;
    padding_class="px-80";
  }
  else if(windowSize.width>=1800 && windowSize.width<=2400){
    preview=1.5;
    padding_class="px-80";
  }
  else if(windowSize.width>=2400){
    preview=1.5;
    padding_class="px-[400px]";
  }


  const [currentSlide, setCurrentSlide] = useState(0);
  //TO restart the blurred version, uncomment the below code

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    // loop: true, // Set loop to false
    mode: 'free-snap',
    slides: {
      perView: preview,
      spacing: 5,
    }
  },
  [
    (slider) => {
      let timeout
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 2000)
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ]
  );

  // Generate slide class
  const slideClass = (index) => {
    return currentSlide === index ? `keen-slider__slide ${styles['slider']} ${styles['active']}` : `keen-slider__slide keen-slider__slide_blur ${styles['slider']}`;
  };


  function handleChatbot(){
    setIsChatOpen((prevState) => !prevState);
    console.log("chatbot calle");
  
  }

  function handleCall(){
    // console.log("voice called");
    window.open('tel: +1 9148254243');

  }

  function handleMicImageClicked(){
    setIsChatOpen((prev)=>!prev);
    setMicOpen((prev)=>!prev);
    console.log("Kuch to huaaa");
  }

  return (
    //For The Blurred Version of the slider

    <div ref={sliderRef} className={`keen-slider ${styles['main_slider']} ${padding_class} `}>
      <div onClick={handleChatbot} className={`keen-slider__slide ${styles['slider']} ${slideClass(0)} `}>
        <Image src={Chatbot} alt='Chabot'/>
      </div>
      <div onClick={handleCall} className={`keen-slider__slide ${styles['slider']} ${slideClass(1)}`}>
        <Image src={Voice} alt='voice'/>
      </div>
      <div onClick={handleMicImageClicked}  className={`keen-slider__slide ${styles['slider']} ${slideClass(2)}`}>
        <Image src={WebVoice} alt='WebVoice'/>
      </div>
      <div className={`keen-slider__slide ${styles['slider']} ${slideClass(3)}`}>
        <Image src={Sms} alt='SMS'/>
      </div>
      <div className={`keen-slider__slide ${styles['slider']} ${slideClass(4)}`}>
        <Image src={SocMed} alt='Socmed'/>
      </div>
    </div>

    //For the Normal Version of the Slider
    // <div ref={sliderRef} className={`keen-slider ${styles['main_slider']} ${padding_class} `}>
    //   <div onClick={handleChatbot} className={`keen-slider__slide ${styles['slider']} `}>
    //     <Image src={Chatbot} alt='Chabot'/>
    //   </div>
    //   <div onClick={handleCall} className={`keen-slider__slide ${styles['slider']}`}>
    //     <Image src={Voice} alt='voice'/>
    //   </div>
    //   <div  className={`keen-slider__slide ${styles['slider']} `}>
    //     <Image src={WebVoice} alt='WebVoice'/>
    //   </div>
    //   <div className={`keen-slider__slide ${styles['slider']} `}>
    //     <Image src={Sms} alt='SMS'/>
    //   </div>
    //   <div className={`keen-slider__slide ${styles['slider']}`}>
    //     <Image src={SocMed} alt='Socmed'/>
    //   </div>
    // </div>
  );
};

export default Slider;