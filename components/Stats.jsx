"use client";

import CountUp from "react-countup";

const stats = [
    {
        num: 3,
        text: "Años de experiencia"
    },
    {
        num: 11,
        text: "Proyectos completados"
    },
    {
        num: 3,
        text: "Tecnologías dominadas"
    },
    {
        num: 107,
        text: "Commits de código"
    },
];

const Stats = () => {
    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[88vw] mx-auto xl:max-w-none">
                    {stats.map((item, index) => (
                        <div className="flex items-center justify-center flex-1 gap-4 xl:justify-start" key={index}>
                            <span className="text-4xl font-extrabold xl:text-6xl">
                                <CountUp end={item.num} duration={5} delay={2} />
                            </span>
                            <p className={`${item.text.length < 15 ? "max-w-[150px]" : ""} leading-snug text-white/80`}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
