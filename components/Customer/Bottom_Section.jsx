import React  from 'react';
import Styles from '@/styles/Customer.module.css';
import ContactModal from '../Contact_Modal/ContactModal';

const Bottom_Section = ({setModalShow}) => {
  return ( 
    <div className={Styles.Bottom_Container}>
      <div className={Styles.Content_section}>
        <div className={Styles.top_heading}>
            It's time to 
        </div>
        <div className={Styles.main_heading}>
        Have a New Thinking about your new business!
        </div>
        <div className={Styles.small_para}>
        Conversational AI creates human experiences and elevates customer service, with the tools teams need to effectively manage residents and prospects.
        </div> 
        <div onClick={()=>setModalShow(true)} className={Styles.Bottom_Button}>
            <span>
            Start Integration Now
            </span>
        </div>
      </div>
    </div>
  )
}

export default Bottom_Section
