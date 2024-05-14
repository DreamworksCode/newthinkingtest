import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import styles from "@/styles/Solutions.module.css";
import Data from "./Data";

const Structure = () => {
  const [index, setIndex] = useState(0);
  // let index=2;
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Check if window is defined (not during SSR)
    if (typeof window !== "undefined") {
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
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  let preview = 1.9;
  let padding_class = "px-16";
  if (windowSize.width >= 500 && windowSize.width <= 900) {
    preview = 3;
    padding_class = "px-10";
  } else if (windowSize.width >= 900) {
    preview = 5;
    padding_class = "px-4";
  }
  const [sliderRef] = useKeenSlider({
    loop: true, // Set loop to false
    mode: "free-snap",
    slides: {
      perView: preview,
      spacing: 5,
    },
  });
  useEffect(()=>{

  },[index]);
  const handleSelect=(i)=>{
    setIndex(i)
  }
  
  return (
    <>
      <div>
        <div ref={sliderRef} className={`keen-slider ${padding_class} mb-4 mt-2 sm:mb-0 md:mb-2  `}>
          {/* {[
            "Conversational AI Chatbots",
            "AI Powered Phone Assistant",
            "Conversational AI for Website Navigation",
            "Real-Time SMS Support",
            "AI Marketing Assistant",
          ].map((navigation, index) => (
            <div
              key={index}
              className={`keen-slider__slide ${styles.slider}`}
              onClick={handleSelect(index)}
            >
              <span className={styles.nav}>{navigation}</span>
            </div>
          ))} */}
          <div className={`keen-slider__slide ${styles.slider} cursor-pointer`} onClick={()=>handleSelect(0)} >
            <span className={styles.nav}>Conversational AI Chatbots</span>
          </div>
          <div className={`keen-slider__slide ${styles.slider} cursor-pointer`} onClick={()=>handleSelect(1)}>
            <span className={styles.nav}>AI Powered Phone Assistant</span>
          </div>
          <div className={`keen-slider__slide ${styles.slider} cursor-pointer`} onClick={()=>handleSelect(2)}>
            <span className={styles.nav}>Conversational AI for Website Navigation</span>
          </div>
          <div className={`keen-slider__slide ${styles.slider} cursor-pointer`} onClick={()=>handleSelect(3)}>
            <span className={styles.nav}>Real-Time SMS Support</span>
          </div>
          <div className={`keen-slider__slide ${styles.slider} cursor-pointer`} onClick={()=>handleSelect(4)}>
            <span className={styles.nav}>AI Marketing Assistant</span>
          </div>
        </div>
        <Data index={index} />
      </div>
    </>
  );
};

export default Structure;
