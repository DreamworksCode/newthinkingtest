import React from 'react'
import Image from "next/image";
import Email from '@/public/assets/Email/Email.png';
import Sms from '@/public/assets/Email/SMS.png';
import Styles from '@/styles/Email.module.css';

const Email_SMS = () => {
  return (
    <div className='picture-container bg-[#F7F7F7] text-center py-16'>
        <div className={Styles.picture1}>
            {/* <img src={SMS} alt="Email and Contact Forms" /> */}
            <Image src={Email} alt='Email and Contact Forms' />
        </div>
        <div className={Styles.picture2}>
            <Image src={Sms} width={275} height={372} alt='An SMS picture'/>
        </div>
    </div>
  )
}

export default Email_SMS;
