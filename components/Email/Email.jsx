import React from "react";
import Email_SMS from "./Helper/Email_SMS";
import Percentage from "./Helper/Percentage";
import Styles from '@/styles/Email.module.css';

const Email = () => {
  return (
    <div>
      <div className={Styles.content}>
        <div className={Styles.top_heading}>
        MULTIPLE CHANNELS, ONE AI ASSISTANT
        </div>
        <div className={Styles.main_heading}>
        Every Email, Call, Text, Chat… New Thinking Responds
        </div>
        <div className={Styles.small_para}>
        manages communication across multiple channels and automatically answers questions within minutes — even after hours.
        </div>
      </div>
      <Email_SMS />
      <Percentage />
    </div>
  );
};

export default Email;
