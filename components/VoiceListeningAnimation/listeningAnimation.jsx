import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

 

const ListeningAnimation = () => {
  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle animation to create a blinking effect
      setAnimationState((prevState) => ({
        isStopped: !prevState.isStopped,
        isPaused: false,
      }));
    }, 1000);

    return () => clearInterval(interval);
  },[]);

 

  return (
    <div className="animationLoader">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: require("./animation.json"),
          animationSpeed:1.5
        }}
        height={500}
        width={325}
      />
    </div>
  );
};

export default ListeningAnimation;
