import React from "react";
import Bottom_Section from "./Bottom_Section";
import Styles from "@/styles/Customer.module.css";
import image1 from "@/public/assets/Customer/image1.png";
import image2 from "@/public/assets/Customer/image2.png";
import image3 from "@/public/assets/Customer/image3.png";
import Image from "next/image";
import Case_Study from "./Case_Study";
import { Carousel } from "react-bootstrap";

const Customer = ({setModalShow}) => {
  return (
    <div>
      <div className={Styles.Customer}>
        <div className={Styles.Customer_Content_box}>
          <div className={Styles.diff_heading}>CUSTOMER SUCCESS STORIES</div>
          <div className={Styles.Customer_heading}>Hear from our customers</div>
        </div>
        <div className={`ml-10  hidden lg:flex xl:flex 2xl:flex lg:flex-end xl:flex-end 2xl:flex-end ${Styles.case_study_container}`}> 
          <Case_Study
            image={image1}
            button="BRAND NAME"
            description="Case study title here"
          />
          <Case_Study
            image={image2}
            button="BRAND NAME"
            description="Case study title here"
          />
          <Case_Study
            image={image3}
            button="BRAND NAME"
            description="Case study title here"
          />
        </div>
        <div className="lg:hidden xl:hidden 2xl:hidden flex justify-center items-center ">
          <Carousel>
            <Carousel.Item>
              <div className={Styles.photos} >
                <Image src={image1} />
                <div className={Styles.photo_brand_name}>BRAND NAME</div>
                <div className={Styles.photo_description}>Case study title here</div>
                <div className={Styles.photo_case_study}>VIEW CASE STUDY</div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className={Styles.photos} >
                <Image src={image2} />
                <div className={Styles.photo_brand_name}>BRAND NAME</div>
                <div className={Styles.photo_description}>Case study title here</div>
                <div className={Styles.photo_case_study}>VIEW CASE STUDY</div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className={Styles.photos} >
                <Image src={image3} />
                <div className={Styles.photo_brand_name}>BRAND NAME</div>
                <div className={Styles.photo_description}>Case study title here</div>
                <div className={Styles.photo_case_study}>VIEW CASE STUDY</div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Bottom_Section setModalShow={setModalShow} />
    </div>
  );
};

export default Customer;
