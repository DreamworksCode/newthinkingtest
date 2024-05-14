import React from "react";
import Styles from "@/styles/Contact.module.css";
import Chatbot from "../ChatBot/ChatBot";
import Location from "@/public/assets/Contact/Location.png";
import Phone from "@/public/assets/Contact/Phone.png";
import Mail from "@/public/assets/Contact/Mail.png";

import Image from "next/image";

const Contact = () => {
  return (
    <>
      <div className={Styles.contact_container}>
        <div className={Styles.container1}>
          <div className="font-bold text-xl my-2  2xl:text-2xl">
            <span>Contact Us:</span>
          </div>
          <ul>
            <li className=" my-2 text-sm lg:text-lg xl:text-lg 2xl:text-xl">
              "Let's Talk Human to Human"
            </li>
            <div className="flex my-2 ">
              <div>
                <Image src={Mail} width={25} height={20} />
              </div>
              <li className=" mx-2 text-sm lg:text-lg xl:text-lg 2xl:text-xl">
                info@newthinking.ai
              </li>
            </div>
            <div className="flex my-2">
              <div>
                <Image src={Phone} width={20} height={20} />
              </div>
              <li className=" mx-2">+1 914-825-4243</li>
            </div>
            <div className="flex my-2">
              <div>
                <Image src={Location} width={30} height={30} />
              </div>
              <li className=" mx-2 text-sm lg:text-lg xl:text-lg 2xl:text-xl">
                109 general holmes drive kyeemagh 2216 Sydney NSW Australia
              </li>
            </div>
          </ul>
          {/* <div>Contacat Us</div> */}
        </div>
        {/* <div className={Styles.container2}>
          <div className=" font-bold text-sm lg:text-lg xl:text-lg 2xl:text-xl">
            Frequently Asked Questions
          </div>
          <div className="text-sm font-bold  lg:text-lg xl:text-lg 2xl:text-xl">
            Blog
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </div> */}
      </div>
    </>
  );
};

export default Contact;
