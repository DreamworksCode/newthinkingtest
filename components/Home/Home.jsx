import React, { useState } from "react";
import Styles from "@/styles/Home.module.css";
import Tick from "@/public/assets/Home/Tick.png";
import Image from "next/image";
// import Slider from "./Slider";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("@/components/Home/Slider"), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>, // Optional loading component
});

const Home = ({ setIsChatOpen, setOpenMicModel,setModalShow,setMicOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <div className={Styles.content}>
        <div className={Styles.main_heading}>
          <div className={Styles.start}> The All-In-One </div>
          <span>&nbsp;AI Platform</span>
          <div>For Your Business</div>
          {/* <h1>The All-In-One  <span>AI Platform</span> For Your Business  </h1> */}
        </div>
        <div className={Styles.list}>
          <div className={Styles.link1}>
            <div className={Styles.image}>
              <Image src={Tick} width={20} height={20} />
            </div>
            <span> AI Email</span>
          </div>
          <div className={Styles.link2}>
            <di className={Styles.image} v>
              <Image src={Tick} width={20} height={20} />
            </di>
            <span> AI SMS</span>
          </div>
          <div className={Styles.link3}>
            <div className={Styles.image}>
              <Image src={Tick} width={20} height={20} />
            </div>
            <span> Voice AI</span>
          </div>
          <div className={Styles.link4}>
            <div className={Styles.image}>
              <Image src={Tick} width={20} height={20} />
            </div>
            <span> Marketing AI</span>
          </div>
          <div className={Styles.link5}>
            <div className={Styles.image}>
              <Image src={Tick} width={20} height={20} />
            </div>
            <span> Conversational AI for Websites</span>
          </div>
        </div>
      </div>
      <Slider setIsChatOpen={setIsChatOpen} setOpenMicModel={setOpenMicModel} setMicOpen={setMicOpen} />
      <div className={Styles.demo}>
        <div onClick={()=>setModalShow(true)} className={Styles.button}>Schedule a demo</div>
      </div>
    </div>
  );
};

export default Home;
