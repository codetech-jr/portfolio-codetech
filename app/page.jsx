import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaBriefcase } from "react-icons/fa"
import Socials from "@/components/Socials"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import ProcessWork from "@/components/sections/ProcessWork";
import FAQs from "@/components/sections/FAQs";
import Contact from "@/components/sections/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <section className="h-full">
      <div className="container h-full mx-auto">
        <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="order-2 text-center xl:text-left xl:order-none">
            <span className="text-xl">Web Developer</span>
            <h1 className="mb-6 h1">
              Hola, Soy <br /> <span className="text-[#00C6FF]">Junior Daniel</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
            Ayudo a negocios a crear experiencias digitales elegantes que atraen y retienen usuarios.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col items-center gap-8 xl:flex-row">
<Button className="uppercase flex items-center gap-2 border-2 border-[#00C6FF] text-[#0C0C2C] hover:bg-[#0C0C2C] hover:text-[#00C6FF] transition-transform duration-300 ease-in-out px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105">
              <a href="#projects" className="flex items-center gap-2">
                <span>Ver mis trabajos</span>
                <FaBriefcase className="text-xl" />
              </a>
            </Button>
              <div className="mb-8 xl:mb-0">
              <Socials 
                  containerStyles="flex gap-6"
              />
              </div>
            </div>
          </div>
          {/* photo */}
            <div className="order-1 mb-8 xl:order-none xl:mb-0">
              <Photo />
            </div>
        </div>
      </div>
      <Stats />
      <Projects />
      <Services />
      <Testimonials />
      <ProcessWork />
      <FAQs />
      <Contact />
      <Footer />
    </section>
  );
}
