import React, { useState } from "react";
// import Chatbot from "@/components/ChatBot/ChatBot";
import Company from "@/components/Companies/Company";
import Contact from "@/components/Contact/Contact";
import Customer from "@/components/Customer/Customer";
import Email from "@/components/Email/Email";
import Footer from "@/components/Footer/Footer";
import Home from "@/components/Home/Home";
import Navbar from "@/components/Navbar/Navbar";
import Solutions from "@/components/Solutions/Soutions";
import Text_slider from "@/components/Text_slider/Text_slider";
import Test from "@/components/Test/Test";
import dynamic from 'next/dynamic';
import ContactModal from "@/components/Contact_Modal/ContactModal";
const Chatbot = dynamic(() => import('@/components/ChatBot/ChatBot'), {
  ssr: false, // Set to false to enable client-side rendering
});

function Index() {
  const [modalShow, setModalShow] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [micOpen,setMicOpen]=useState(false);
  return (
    <div className="inter">
      {/* <Test/>/ */}
      <Navbar />
      <div className="pt-20"></div>
      <Chatbot setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} micOpen={micOpen} setMicOpen={setMicOpen}  />
      <Home setIsChatOpen={setIsChatOpen}  setModalShow={setModalShow} micOpen={micOpen} setMicOpen={setMicOpen} />
      <Company />
      <Solutions />
      <Text_slider />
      <Email />
      <Customer setModalShow={setModalShow} />
      <Contact />
      <Footer />
      <ContactModal show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  );
}

export default Index;
