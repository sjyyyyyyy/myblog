import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import img1 from './images/1.jpg'
export default function Bottom() {
    // 总页数
    const PAGECOUNT = 12
    // 当前页面编号
    let pageNo = 0
    let pages=[];
    let cover=[];
    let btn=[];
    let allPages=[];

    const book = useRef();
    const button=useRef();
    function init() {
        // 初始化内容页的图片
        for (let index = 0; index < pages.length; index++) {
            pages[index].style.backgroundImage = `url(${img1})`
            pages[index].style.zIndex = PAGECOUNT - index - 1
        }
        cover[0].style.zIndex = PAGECOUNT
        cover[1].style.zIndex = 1

        // 默认页面为封面，左按钮无效
        btn[0].style.backgroundColor = "rgba(110, 110, 110, 0.5)"
        btn[0].style.color = "darkgray"
        btn[0].disabled = true

        // 左翻页
        btn[0].onclick = function() {
            pageNo -- 
            // 如果当前是最后一页，并往前翻
            if ((PAGECOUNT - 1) == pageNo) {
                allPages[pageNo].style.transform = 'rotateY(0deg)'
                //( 240px + 50px ) * 0.5
                book.current.style.transform = 'translateX(250px)'
                btn[1].style.backgroundColor = "rgba(63, 63, 63, 0.8)"
                btn[1].style.color = "white"
                btn[1].disabled = false   
            }
            else {
                allPages[pageNo].style.transform = 'rotateY(0deg)'
            }
            allPages[pageNo].style.zIndex = PAGECOUNT - pageNo

            if( 0 == pageNo ) {
                btn[0].style.backgroundColor = "rgba(110, 110, 110, 0.5)"
                btn[0].style.color = "darkgray"
                btn[0].disabled = true
                book.current.style.transform = 'translateX(0px)'
            }
        }

        // 右翻页
        btn[1].onclick = function() {
            // 如果当前是第一页，并往后翻
            if ( 0 == pageNo ) {
                allPages[pageNo].style.transform = 'rotateY(-180deg)'
                
                //( 240px + 50px ) * 0.5
                book.current.style.transform = 'translateX(250px)'
                btn[0].style.backgroundColor = "rgba(63, 63, 63, 0.8)"
                btn[0].style.color = "white"
                btn[0].disabled = false   
            }
            else {
                allPages[pageNo].style.transform = 'rotateY(-180deg)'
              
            }

            allPages[pageNo].style.zIndex = 1000 + pageNo
            pageNo ++

            if( PAGECOUNT == pageNo ) {
                btn[1].style.backgroundColor = "rgba(110, 110, 110, 0.5)"
                btn[1].style.color = "darkgray"
                btn[1].disabled = true
                book.current.style.transform = 'translateX(500px)'
            }
        }
    }
    useEffect(() => {
        pages=[...book.current.children].slice(1,-1)
        cover=[...book.current.children].slice(0,1).concat([...book.current.children].slice(-1))
        btn=[...button.current.children]
        allPages=[...book.current.children]
        init()
    }, [])
      
      
    return (
        <div className={styles.all}>
            <div className={styles.item}>
                <div className={styles.book_container}>
                    <div ref={book} className={styles.book}>
                        <div className={`${styles.book_cover} ${styles.one_page}`}><span>Project</span></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}>111</div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_page} ${styles.one_page}`}></div>
                        <div className={`${styles.book_cover} ${styles.one_page}`}></div>
                    </div>
                    <div ref={button} className={styles.control}>
                        <button>&lt;</button>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                111
            </div>
            <div className={styles.item}>
                111
            </div>
        </div >
    );
}