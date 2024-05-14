import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

 

const LoadingModel = () => {
  const [animationState, setAnimationState] = useState({ isStopped: false, isPaused: false,});

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prevState) => ({
        isStopped: prevState.isStopped,
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
          animationData: require("./loading.json"),
        }}
        height={140}
        width={150}
        speed={2.5}
        // isStopped={animationState.isStopped}
        // isPaused={animationState.isPaused}
      />
    </div>
  );
};

export default LoadingModel;
