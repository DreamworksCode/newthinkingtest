import React from 'react'
import styles from '@/styles/Text_Slider.module.css';
import Image from 'next/image';

const Slide_Content = ({image,text,name,title}) => {
  return (
    <div className={styles.carousel_container}>
      <Image src={image} />
      <div className={styles.text}>"{text}"</div>
      <div className={styles.user}>&ndash;&ndash;{name},{title}</div>
    </div>
    
  ) 
}

export default Slide_Content
