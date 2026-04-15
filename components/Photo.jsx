"use client"

import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] xl:w-[586px] xl:h-[506px]">
                <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fade-in-delay-2">
                    <Image
                        src="/assets/alejo-1.png"
                        alt="Foto de Alejo"
                        fill
                        priority={true}
                        quality={80}
                        sizes="(max-width: 768px) 298px, 498px"
                        className="object-cover rounded-full mix-blend-lighten"
                    />
                </div>

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" fill="transparent" viewBox="0 0 506 506" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="253" cy="253" r="250" stroke="#00C6FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="fade-in" style={{opacity:0.9}} />
                </svg>
            </div>
        </div>
    );
};

export default Photo;