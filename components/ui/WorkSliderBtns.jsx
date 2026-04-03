"use client";

import { useSwiper } from "swiper/react";
// Inline carets to avoid loading react-icons package

const WorkSliderBtns = ({containerStyles, btnStyles, iconStyles}) =>{
    const swiper = useSwiper();
    return (
        <div className={containerStyles}>
            <button className={btnStyles} onClick={()=> swiper.slidePrev()}>
                <svg className={iconStyles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button className={btnStyles} onClick={()=> swiper.slideNext()}>
                <svg className={iconStyles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default WorkSliderBtns