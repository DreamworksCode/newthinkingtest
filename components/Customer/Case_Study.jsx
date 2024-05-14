import React from "react";
import Styles from "@/styles/Customer.module.css";
import Image from "next/image";

const Case_Study = ({ image, button, description }) => {
  return (
      <div className={Styles.images}>
        <Image src={image} />
        <div className={Styles.brand_name}>{button}</div>
        <div className={Styles.description}>{description}</div>
        <div className={Styles.case_study}>VIEW CASE STUDY</div>
      </div>
  );
};

export default Case_Study;
