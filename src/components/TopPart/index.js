import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css';
import stars_t from './images/stars.png';
import moon_t from './images/moon.png';
import mountain_b from './images/mountains_behind.png';
import mountain_f from './images/mountains_front.png'


export default function TopPart() {
    const stars = useRef();
    const moon=useRef();
    const mountains_behind=useRef();
    const text=useRef();
    const btn=useRef();
    const mountains_front=useRef();
    window.addEventListener('scroll', function(){
      let value = window.scrollY;
      stars.current.style.left = value * 0.25 + 'px'
      moon.current.style.top = value * 1.05 + 'px'
      mountains_behind.current.style.top = value * 0.5 + 'px'
      mountains_front.current.style.top = value * 0 + 'px'
      text.current.style.marginRight = value * 4 + 'px'
      text.current.style.marginTop = value * 1.5 + 'px'
      btn.current.style.marginTop = value * 1.5 + 'px'
    })
    return (
        <div className={styles.all}>
            <section className={styles.section}>
                <img  ref={stars} src={stars_t} id="stars"/>
                
                    <img ref={moon} src={moon_t} className={styles.moon}/>
                        <img ref={mountains_behind} src={mountain_b} className={mountains_behind}/>
                            <h2 ref={text} className={styles.text}>Moon Light</h2>
                            <a ref={btn} href="#sec" className={styles.btn}>Explore</a>
                            <img ref={mountains_front} src={mountain_f} className={styles.mountains_front}/>
                            </section>
                            <div className={styles.sec} id="sec">
                                <h2>Parallax Scrolling Effects</h2>
                                <p>loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem</p>
                                </div>
                                    </div >
                                    );
}