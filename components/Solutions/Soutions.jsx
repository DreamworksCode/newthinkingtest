import React from "react";
import Styles from '@/styles/Solutions.module.css';
import Structure from "./Structure";

const Solutions = () => {
  return (
    <div>
      <div className={Styles.content}> 
        <div className={Styles.top_heading}>
          INDUSTRY FIRST, INDUSTRY LEADING, INDUSTRY CHANGING
        </div>
        <div className={Styles.main_heading}>
          <div className={Styles.start}>One platform with all </div>
          <span>&nbsp;AI Solutions</span>
          <div>For Your Business</div>
        </div> 
        <div className={Styles.small_para}>
          Welcome to New Thinking where innovation meets practicality. Dive into
          the realm of AI with our sophisticated, user-friendly solutions
          tailored to enhance your business efficiency and customer engagement.
        </div>
      </div>
      <Structure/>
    </div>
  );
};

export default Solutions;
