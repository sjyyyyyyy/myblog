import React, { useRef } from 'react';
import styles from './styles.module.css';
import cloud1 from './images/cloud1.png'
import cloud2 from './images/cloud2.png'
import cloud3 from './images/cloud3.png'
import cloud4 from './images/cloud4.png'
import cloud5 from './images/cloud5.png'
import bg from './images/bg.jpg'
export default function Bottom() {
    const windowx=window?window:global
    let banner = {
        position: 'relative',
        width: '100%',
        height: ' 100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const text = useRef()
   
    windowx.addEventListener('scroll', function () {
   
        let value = windowx.scrollY;
        text.current.style.marginBotton = value * 2 + 'px';
    });
    return (
        <div className={styles.all}>
            <section className={styles.section}>
                <h2>Realistic Cloud Banner Parallax Effects</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipi</p>
            </section>
            <div style={banner}>
                <h2 ref={text} className={styles.text}>Heaven</h2>
                <div className={styles.clouds}>
                    <img src={cloud1} className={`${styles.img} ${styles.img_one}`} />
                    <img src={cloud2} className={`${styles.img} ${styles.img_two}`} />
                    <img src={cloud3} className={`${styles.img} ${styles.img_three}`} />
                    <img src={cloud4} className={`${styles.img} ${styles.img_four}`} />
                    <img src={cloud5} className={`${styles.img} ${styles.img_five}`} />
                    <img src={cloud1} className={`${styles.img} ${styles.img_ten}`} />
                    <img src={cloud2} className={`${styles.img} ${styles.img_nine}`} />
                    <img src={cloud3} className={`${styles.img} ${styles.img_eight}`} />
                    <img src={cloud4} className={`${styles.img} ${styles.img_seven}`} />
                    <img src={cloud5} className={`${styles.img} ${styles.img_six}`} />
                </div>
            </div>
        </div >
    );
}