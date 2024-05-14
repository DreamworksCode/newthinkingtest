import React from "react";
import Chatbot from "@/public/assets/Home/AIChatbot.gif";
import Voice from "@/public/assets/Home/AIVoice.gif";
import Sms from "@/public/assets/Home/SMSAI.gif";
import SocMed from "@/public/assets/Home/SocMed.gif";
import WebVoice from "@/public/assets/Home/WebVoice.gif";
import Image from "next/image";
import styles from "@/styles/Solutions.module.css";
import Check from "@/public/assets/Solutions/Check.png";

const Data = ({ index }) => {
  const data_array = [
    {
      image: Chatbot,
      heading: "Conversational AI Chatbot",
      text: "Struggling with social media? Our AI Marketing Assistant crafts perfect posts and analyses trends, so you don’t have to.",
      blurred_text: "Manages 90%of a social media managers work:",
      button: "Boost Your Social Media Presence Now.",
    },
    {
      image: Voice,
      heading: "AI Powered Phone Assistant",
      text: "Struggling with social media? Our AI Marketing Assistant crafts perfect posts and analyses trends, so you don’t have to.",
      blurred_text: "Manages 90%of a social media managers work:",
      button: "Boost Your Social Media Presence Now.",
    },
    {
      image: WebVoice,
      heading: "Conversational AI for Website Navigation",
      text: "Struggling with social media? Our AI Marketing Assistant crafts perfect posts and analyses trends, so you don’t have to.",
      blurred_text: "Manages 90%of a social media managers work:",
      button: "Boost Your Social Media Presence Now.",
    },
    {
      image: Sms,
      heading: "Real-Time SMS Support",
      text: "Struggling with social media? Our AI Marketing Assistant crafts perfect posts and analyses trends, so you don’t have to.",
      blurred_text: "Manages 90%of a social media managers work:",
      button: "Boost Your Social Media Presence Now.",
    },
    {
      image: SocMed,
      heading: "AI Marketing Assistant",
      text: "Struggling with social media? Our AI Marketing Assistant crafts perfect posts and analyses trends, so you don’t have to.",
      blurred_text: "Manages 90%of a social media managers work:",
      button: "Boost Your Social Media Presence Now.",
    },
  ]; 
  return ( 
    <div className={styles.box}>
      <div className={styles.image}>
        <Image src={data_array[index].image}  />
      </div>
      <div className={styles.description_container}>
        <div className={styles.text_container}>
          <div className={styles.Check}>
            <Image src={Check} width={50} height={50} />
          </div>
          <div className={styles.description_content}>
            <div className={styles.main_content}>
              <div className={styles.heading}>{data_array[index].heading}</div>
              <div className={styles.text}>{data_array[index].text}</div>
            </div>
            <div className={styles.button}>{data_array[index].button}</div>
          </div>
        </div>
        <div className={styles.blurred_box}>
          <div className={styles.tick}>
            <Image src={Check} height={30} width={30} />
          </div>
          <div className={styles.blurred_text}>
            {data_array[index].blurred_text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
