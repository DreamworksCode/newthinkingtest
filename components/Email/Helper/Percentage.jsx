import React from "react";
import Styles from "@/styles/Email.module.css";
import { Carousel } from "react-bootstrap";

const Percentage = () => {
  return (
    <>
      <div className="lg:pl-32 xl:pl-32 2xl:pl-32  lg:flex-row pt-20  lg:flex hidden">
        <div className={Styles.Percentage_Container}>
          <div className={`text-[#6032E3] text-7xl text-center ${Styles.percentage_value}`}>50%</div>
          <div className=" pt-7">
            <p className="font-bold text-center justify-center px-8 text-xl 2xl:text-3xl">
              Generative AI chatbots and AI-Phone Assitants
            </p>
            <p className="px-8  text-center flex justify-center 2xl:text-xl mt-2">
              Up to 50% reduction in response time for customer inquiries.
            </p>
          </div>
        </div>
        <div className={Styles.Percentage_Container}>
          <div className={`text-[#6032E3] text-7xl text-center pb-7 ${Styles.percentage_value}`}>40%</div>
          <div className=" pt-1">
            <p className="font-bold text-center justify-center px-8 text-xl 2xl:text-3xl ">
              AI SMS for real-time
            </p>
            <p className="px-8 text-center flex justify-center 2xl:text-xl mt-2">
              Increase in marketing ROl by 20-40% with data-driven strategies
              and efficient content distribution.
            </p>
          </div>
        </div>
        <div className={Styles.Percentage_Container2}>
          <div className={`text-[#6032E3] text-7xl text-center pb-7 ${Styles.percentage_value}`}>50%</div>
          <div className="">
            <p className="font-bold text-center justify-center px-8 text-xl pb-0 2xl:text-3xl">
              Operation Efficiency
            </p>
            <p className="px-8 text-center flex justify-center 2xl:text-xl mt-2">
              Conversational Al for Websites and Al-Powered Phone Assistants
              Decrease in average handling time for customer service queries by
              30-50%.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:hidden xl:hidden 2xl:hidden py-10" >
        <Carousel>
          <Carousel.Item>
          <div >
          <div className="text-[#6032E3] text-7xl text-center">50%</div>
          <div className=" pt-7">
            <p className="font-bold text-center justify-center px-8 text-xl">
              Generative AI chatbots and AI-Phone Assitants
            </p>
            <p className="px-8  text-center flex justify-center">
              Up to 50% reduction in response time for customer inquiries.
            </p>
          </div>
        </div>
          </Carousel.Item>
          <Carousel.Item>
          <div >
          <div className="text-[#6032E3] text-7xl text-center pb-7 ">40%</div>
          <div className=" pt-1">
            <p className="font-bold text-center justify-center px-8 text-xl ">
              AI SMS for real-time
            </p>
            <p className="px-8 text-center flex justify-center">
              Increase in marketing ROl by 20-40% with data-driven strategies
              and efficient content distribution.
            </p>
          </div>
        </div>
          </Carousel.Item>
          <Carousel.Item>
          <div >
          <div className="text-[#6032E3] text-7xl text-center pb-7">50%</div>
          <div className="">
            <p className="font-bold text-center justify-center px-8 text-xl pb-0">
              Operation Efficiency
            </p>
            <p className="px-8 text-center flex justify-center">
              Conversational Al for Websites and Al-Powered Phone Assistants
              Decrease in average handling time for customer service queries by
              30-50%.
            </p>
          </div>
        </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Percentage;
